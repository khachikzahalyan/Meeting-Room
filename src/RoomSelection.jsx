import React from "react";

function RoomSelection({
  rooms,
  selectedRoomIndex,
  handleRoomSelect,
  prevSlide,
  nextSlide
}) {
  return (
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
        {rooms &&
          rooms.map((_, index) => (
            <div
              key={index}
              onClick={() => handleRoomSelect(index)}
              className={`selectRoomLI ${
                selectedRoomIndex === index ? "true" : "false"
              }`}
            >
              <img
                alt="rooms"
                src={process.env.PUBLIC_URL + `/photo/room${index + 1}.jpg`}
                className={`imgRooms ${0 === index ? "active" : ""}`}
              />
            </div>
          ))}
      </div>
    </div>
  );
}

export default RoomSelection;
