import React, { useState } from "react";
import "./navbar.css";

const Navbar = ({ authenticated, setAuthenticated }) => {
  const handleClick = async (e) => {
    e.preventDefault();
    if (!authenticated) {
      window.location.href = "/login";
    }
    if (authenticated) {
      setAuthenticated(!authenticated);
    }
  };

  return (
    <div className="navbar">
      <div className="navbar-title">Task-Tracker</div>
      <h4>Welcome {sessionStorage.getItem("userName")} !!</h4>
      <div className="navbar-btn">
        <button onClick={(e) => handleClick(e)}>
          {authenticated ? "logout" : "login"}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
