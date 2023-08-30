import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import "./homepage.css";

const HomePage = ({ authenticated, setAuthenticated }) => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState("login");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleSignIn = async () => {
    console.log("1");
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    console.log("2");
    var raw = JSON.stringify({
      email: email,
      password: password,
    });
    console.log("3");

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    console.log("4");
    try {
      console.log("5");
      const response = await fetch(
        "http://localhost:3001/login",
        requestOptions
      );
      console.log("6");
      const result = await response.text();
      const parseResult = JSON.parse(result);
      if (parseResult.message === "user loggedin successfully") {
        console.log(parseResult.token);
        sessionStorage.setItem("auth", parseResult.token);
        setAuthenticated(true);
        setActiveTab("");
      }
      if (parseResult.error) {
        alert(parseResult.error);
        setEmail("");
        setPassword("");
      }
    } catch (error) {
      console.log("error", error);
    }
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
      setAuthenticated(true);
      setActiveTab("");
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
        {authenticated ? (
          <div>
            <Navigate to="/dashboard" />
          </div>
        ) : (
          <>
            {activeTab === "login" && (
              <div className="form-login">
                <div className="form-login-google">
                  <p style={{ fontWeight: 300, fontSize: "20px" }}>
                    Sign in with:
                  </p>
                  {/* Add your sign-in with social buttons here */}
                  <p style={{ fontWeight: 300, fontSize: "16px" }}>or:</p>
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
                  <button
                    style={{ marginTop: "5px" }}
                    onClick={() => handleTabClick("register")}
                  >
                    Register
                  </button>
                </p>
              </div>
            )}

            {activeTab === "register" && (
              <div className="form-register">
                <div className="form-register-google">
                  <p style={{ fontWeight: 300, fontSize: "20px" }}>
                    Sign up with:
                  </p>
                  {/* Add your sign-up with social buttons here */}
                  <p style={{ fontWeight: 300, fontSize: "16px" }}>or:</p>
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
          </>
        )}
      </div>
    </div>
  );
};

export default HomePage;
