import React, { useState } from "react";
import Meeting from "./Meeting";
import Login from "./Login";
import "./App.css";

function App() {
  const [showMeeting, setShowMeeting] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const handleMeetingClick = () => {
    setShowMeeting(true);
    setShowLogin(false);
  };

  const handleLoginClick = () => {
    setShowMeeting(false);
    setShowLogin(true);
  };

  return (
    <div className="container">
      {showMeeting && <Meeting />}
      {showLogin && <Login />}
      {!showMeeting && !showLogin && (
        <div className="center">
          <div className="MeetingPage" onClick={handleMeetingClick}>
            Meeting
          </div>
          <div className="LoginPage" onClick={handleLoginClick}>
            Login
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
