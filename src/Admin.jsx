import React from "react";
import RoomSelection from "./RoomSelection";
const Admin = ({ rooms }) => {
  return (
    <div>
      <h1>Admin</h1>
      <RoomSelection />
      {console.log(rooms)}
    </div>
  );
};

export default Admin;
