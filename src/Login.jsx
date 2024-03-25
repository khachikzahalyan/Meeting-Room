import React, { useState } from "react";
import Admin from "./Admin";

function Login({ selectedRoom, rooms, isPastTime }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (username === "" && password === "") {
      setIsLoggedIn(true);
      setError("");
    } else {
      setIsLoggedIn(false);
      setError("Incorrect username or password");
    }
  };

  if (isLoggedIn) {
    return (
      <Admin
        selectedRoom={selectedRoom}
        rooms={rooms}
        isPastTime={isPastTime}
      />
    );
  }

  return (
    <div className="generalLoginPage">
      <h1>Login</h1>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <div className="loginPageInput">
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="loginPageInput">
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;
