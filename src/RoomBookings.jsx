import React from "react";

function RoomBookings({ selectedRoom, rooms, isPastTime }) {
  const compareBookingTime = (a, b) => {
    const timeA = new Date(`${a.date}T${a.startTime}`);
    const timeB = new Date(`${b.date}T${b.startTime}`);
    return timeA - timeB;
  };

  return (
    <div className="bookingsBox">
      {selectedRoom !== null && (
        <div className="bookingList">
          <h3>Bookings for Room {selectedRoom + 1}</h3>
          <ul>
            {rooms[selectedRoom]
              .sort(compareBookingTime)
              .map((booking, index) => (
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
  );
}

export default RoomBookings;
