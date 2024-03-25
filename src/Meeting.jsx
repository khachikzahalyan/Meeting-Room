import React, { useState } from "react";
import usersData from "./users.json";
import BookingForm from "./BookingForm";
import RoomBookings from "./RoomBookings";
import RoomSelection from "./RoomSelection";
import "./App.css";

function Meeting() {
  const [rooms, setRooms] = useState(Array.from({ length: 5 }, () => []));
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredNames, setFilteredNames] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [bookedUsers, setBookedUsers] = useState([]);
  const [selectedRoomIndex, setSelectedRoomIndex] = useState(null);

  const handleRoomSelect = (roomIndex) => {
    setSelectedRoomIndex(roomIndex);
  };

  const handleBooking = () => {
    if (
      selectedRoomIndex === null ||
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

    const isOverlap = rooms[selectedRoomIndex].some((booking) => {
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
    updatedRooms[selectedRoomIndex] = [...rooms[selectedRoomIndex], newBooking];
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
      <img
        className="imgIcon"
        src="https://upload.wikimedia.org/wikipedia/hy/thumb/7/7c/Telcell_Logo_%28NEW%29.png/320px-Telcell_Logo_%28NEW%29.png"
        alt="Telcell logo"
      />

      <h2>Select Room:</h2>
      <RoomSelection
        rooms={rooms}
        selectedRoomIndex={selectedRoomIndex}
        handleRoomSelect={handleRoomSelect}
        prevSlide={prevSlide}
        nextSlide={nextSlide}
      />
      <div
        className={`box2 ${
          selectedRoomIndex !== null ? "slideInFromBottom" : "hidden"
        }`}
      >
        <BookingForm
          date={date}
          setDate={setDate}
          startTime={startTime}
          setStartTime={setStartTime}
          endTime={endTime}
          setEndTime={setEndTime}
          error={error}
          selectedUsers={selectedUsers}
          setSelectedUsers={setSelectedUsers}
          filteredNames={filteredNames}
          handleChange={handleChange}
          handleNameClick={handleNameClick}
          handleUserRemove={handleUserRemove}
          handleBooking={handleBooking}
          selectedRoom={selectedRoomIndex}
          searchTerm={searchTerm}
        />
        <RoomBookings
          selectedRoom={selectedRoomIndex}
          rooms={rooms}
          isPastTime={isPastTime}
        />
      </div>
    </div>
  );
}

export default Meeting;
