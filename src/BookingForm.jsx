import React from "react";

function BookingForm({
  date,
  setDate,
  startTime,
  setStartTime,
  endTime,
  setEndTime,
  error,
  selectedUsers,
  filteredNames,
  handleChange,
  handleNameClick,
  handleUserRemove,
  handleBooking,
  selectedRoom,
  searchTerm
}) {
  return (
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
            <label>Start Time: </label>
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="inpTime"
            />
          </div>
          <div className="box">
            <label>End Time: </label>
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
                    <button id="remove" onClick={() => handleUserRemove(index)}>
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
  );
}

export default BookingForm;
