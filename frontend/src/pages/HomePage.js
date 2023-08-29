import React, { useState } from "react";
import "./homepage.css"
const HomePage = () => {
  const [activeTab, setActiveTab] = useState("login");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleSignIn = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      email: email,
      password: password,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:3001/login", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      userName: userName,
      email: email,
      password: password,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    try {
      const response = await fetch(
        "http://localhost:3001/register",
        requestOptions
      );
      const result = await response.text();
      console.log(result);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="homepage">
      <div className="tab">
        <div
          className={`tab ${activeTab === "login" ? "active" : ""}`}
          onClick={() => handleTabClick("login")}
        >
          Login
        </div>
        <div
          className={`tab ${activeTab === "register" ? "active" : ""}`}
          onClick={() => handleTabClick("register")}
        >
          Register
        </div>
      </div>

      <div className="form">
        {activeTab === "login" && (
          <div className="form-login">
            <div className="form-login-google">
              <p style={{fontWeight:300 , fontSize:"20px"}}>Sign in with:</p>
              {/* Add your sign-in with social buttons here */}
              <p style={{fontWeight:300 , fontSize:"16px"}}>or:</p>
            </div>
            <input
              placeholder="Email address"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              placeholder="Password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleSignIn}>Sign in</button>
            <p>
              Not a member?{" "}
              <button style={{marginTop:"5px"}}onClick={() => handleTabClick("register")}>
                Register
              </button>
            </p>
          </div>
        )}

        {activeTab === "register" && (
          <div className="form-register">
            <div className="form-register-google">
              <p style={{fontWeight:300 , fontSize:"20px"}}>Sign up with:</p>
              {/* Add your sign-up with social buttons here */}
              <p style={{fontWeight:300 , fontSize:"16px"}}>or:</p>
            </div>
            <input
              placeholder="Username"
              type="text"
              onChange={(e) => setUserName(e.target.value)}
            />
            <input
              placeholder="Email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              placeholder="Password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleRegister}>Sign up</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
