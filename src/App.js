import React, { useState } from "react";
import "./App.css";
import usersData from "./users.json";

function BookingApp() {
  const [rooms, setRooms] = useState(Array.from({ length: 5 }, () => []));
  const [selectedRoomIndex, setSelectedRoomIndex] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredNames, setFilteredNames] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [bookedUsers, setBookedUsers] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleRoomSelect = (roomIndex) => {
    setSelectedRoomIndex(roomIndex);
    setSelectedRoom(roomIndex);
  };

  const handleBooking = () => {
    if (
      selectedRoom === null ||
      !date ||
      !startTime ||
      !endTime ||
      !selectedUsers.length
    ) {
      setError("Please fill all fields");
      return;
    }

    const startDateTime = new Date(`${date}T${startTime}`);
    const endDateTime = new Date(`${date}T${endTime}`);

    if (endDateTime <= startDateTime) {
      setError("End time must be greater than start time");
      return;
    }

    const newBooking = {
      date: date,
      startTime: startTime,
      endTime: endTime,
      names: selectedUsers.map((user) => `${user.firstName} ${user.lastName}`)
    };

    const isOverlap = rooms[selectedRoom].some((booking) => {
      const existingStartDateTime = new Date(
        `${booking.date}T${booking.startTime}`
      );
      const existingEndDateTime = new Date(
        `${booking.date}T${booking.endTime}`
      );
      return (
        (startDateTime >= existingStartDateTime &&
          startDateTime < existingEndDateTime) ||
        (endDateTime > existingStartDateTime &&
          endDateTime <= existingEndDateTime) ||
        (startDateTime <= existingStartDateTime &&
          endDateTime >= existingEndDateTime)
      );
    });

    if (isOverlap) {
      setError("This time slot is already booked in this room");
      return;
    }

    const updatedRooms = [...rooms];
    updatedRooms[selectedRoom] = [...rooms[selectedRoom], newBooking];
    setRooms(updatedRooms);
    setDate("");
    setStartTime("");
    setEndTime("");
    setError("");
    setBookedUsers([...bookedUsers, ...selectedUsers]);
    setSelectedUsers([]);
    setFilteredNames((prevFilteredNames) =>
      prevFilteredNames.filter(
        (name) =>
          !selectedUsers.some(
            (user) =>
              `${user.firstName} ${user.lastName}` ===
              `${name.firstName} ${name.lastName}`
          )
      )
    );
  };

  const isPastTime = (dateTime) => {
    const now = new Date();
    const checkTime = new Date(dateTime);
    return now > checkTime;
  };

  const handleChange = (e) => {
    const { value } = e.target;

    setSearchTerm(value);

    let filtered = [];

    if (value.trim() !== "") {
      filtered = usersData.users
        .filter(
          (user) =>
            user["Email Address [Required]"]
              .toLowerCase()
              .includes(value.toLowerCase()) &&
            !bookedUsers.some(
              (bookedUser) =>
                `${user["First Name [Required]"]} ${user["Last Name [Required]"]}` ===
                `${bookedUser.firstName} ${bookedUser.lastName}`
            )
        )
        .map((user) => ({
          email: user["Email Address [Required]"],
          firstName: user["First Name [Required]"],
          lastName: user["Last Name [Required]"]
        }));
    }

    setFilteredNames(filtered);
  };

  const handleNameClick = (user) => {
    setSelectedUsers([...selectedUsers, user]);
    setFilteredNames((prevFilteredNames) =>
      prevFilteredNames.filter(
        (name) =>
          `${name.firstName} ${name.lastName}` !==
          `${user.firstName} ${user.lastName}`
      )
    );
  };

  const handleUserRemove = (index) => {
    setSelectedUsers((prevUsers) => prevUsers.filter((_, i) => i !== index));
  };

  const prevSlide = () => {
    setSelectedRoomIndex((prevIndex) =>
      prevIndex === 0 ? rooms.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setSelectedRoomIndex((prevIndex) =>
      prevIndex === rooms.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="generalBox">
      <h1>Booking App</h1>
      <img
        className="imgIcon"
        src="https://upload.wikimedia.org/wikipedia/hy/thumb/7/7c/Telcell_Logo_%28NEW%29.png/320px-Telcell_Logo_%28NEW%29.png"
        alt="Telcell logo"
      />
      <h2>Select Room:</h2>
      <div className="ROOMS">
        <div className="selectRoomUL">
          <div className="buttSlide">
            <button className="slideButton" onClick={prevSlide}>
              ‹
            </button>
            <button className="slideButton" onClick={nextSlide}>
              ›
            </button>
          </div>
          {rooms.map((roomBookings, index) => (
            <div
              key={index}
              onClick={() => handleRoomSelect(index)}
              className={`selectRoomLI ${
                selectedRoomIndex === index ? "true" : "false"
              }`}
            >
              <img
                src={process.env.PUBLIC_URL + `/photo/room${index + 1}.jpg`}
                className={`imgRooms ${currentSlide === index ? "active" : ""}`}
              />
            </div>
          ))}
        </div>
      </div>
      <div
        className={`box2 ${
          selectedRoom !== null ? "slideInFromBottom" : "hidden"
        }`}
      >
        <div className="reserveDate">
          {selectedRoom !== null && (
            <div className="dataBox">
              <div className="box">
                <label>Date:</label>
                <input
                  className="inpTime"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
              <div className="box">
                <label>Start Time:</label>
                <input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="inpTime"
                />
              </div>
              <div className="box">
                <label>End Time:</label>
                <input
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="inpTime"
                />
              </div>
              <div className="box">
                <label>Search Names: </label>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={handleChange}
                  placeholder="Search names"
                  className="inpSearch"
                />
                <ul className="filteredNamesList">
                  {filteredNames.map((user, index) => (
                    <li key={index} onClick={() => handleNameClick(user)}>
                      {user.email}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="box">
                <label>Users: </label>
                <div className="users">
                  {selectedUsers.map((user, index) => (
                    <div key={index} className="user">
                      <div>
                        {user.firstName} {user.lastName}
                      </div>
                      <div>
                        <button
                          id="remove"
                          onClick={() => handleUserRemove(index)}
                        >
                          X
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <button onClick={handleBooking} className="bookButton">
                Book
              </button>
              {error && <p style={{ color: "red" }}>{error}</p>}
            </div>
          )}
        </div>

        <div className="bookingsBox">
          {selectedRoom !== null && (
            <div className="bookingList">
              <h3>Bookings for Room {selectedRoom + 1}</h3>
              <ul>
                {rooms[selectedRoom].map((booking, index) => (
                  <li
                    key={index}
                    style={{
                      color: isPastTime(`${booking.date}T${booking.endTime}`)
                        ? "red"
                        : "green"
                    }}
                  >
                    <div className="bookTime">
                      {`${booking.date} ${booking.startTime} to ${booking.endTime}`}
                    </div>
                    {booking.names.map((name, index) => (
                      <p key={index}>{name}</p>
                    ))}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default BookingApp;
