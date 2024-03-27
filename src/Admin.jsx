import React from "react";

const Admin = ({ rooms, date, startTime, endTime }) => {
  return (
    <div>
      <h1>Admin</h1>

      <div>Date: {date}</div>
      <div>Rooms: {rooms}</div>
      <div>Start Time: {startTime}</div>
      <div>End Time: {endTime}</div>
    </div>
  );
};

export default Admin;
