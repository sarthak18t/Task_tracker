import React, { useEffect, useState } from "react";
import "./dashboard.css";
const DashBoard = ({ authenticated, setAuthenticated }) => {
  const [tasks,setTasks] = useState([]);
  useEffect(() => {
    if (authenticated) {
      var myHeaders = new Headers();
      const token = sessionStorage.getItem("auth");
      myHeaders.append(
        "Authorization",
        `Bearer ${token}`
      );

      var requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      fetch("http://localhost:3001/task", requestOptions)
        .then(
          (response) => response.text()
        )
        .then((result) => setTasks(result))
        .catch((error) => console.log("error", error));
        console.log(tasks)
    }
  });
  return (
    <div>
      {authenticated ? (
        <div></div>
      ) : (
        <div className="not-auth">
          <div class="d-flex justify-content-center">
            <div class="spinner-border" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
          <h1>Login to see all listed tasks</h1>
        </div>
      )}
    </div>
  );
};

export default DashBoard;
