import React, { useEffect, useState } from "react";
import "./dashboard.css";
import {Navigate} from 'react-router-dom'
import HorizontalScrollbar from "../components/HorizontalScrollbar";
const DashBoard = ({ authenticated, setAuthenticated }) => {
  const [tasks, setTasks] = useState([]);

  const handleClick = (e)=>{
    e.preventDefault();
    window.location.href = '/addtask'
}

  useEffect(() => {
    if (authenticated) {
      var myHeaders = new Headers();
      const token = sessionStorage.getItem("auth");
      myHeaders.append("Authorization", `Bearer ${token}`);

      var requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      fetch("http://localhost:3001/task", requestOptions)
        .then((response) => response.text())
        .then((result) => {
          const parseData = JSON.parse(result);
          setTasks(parseData.tasks);
        })
        .catch((error) => console.log("error", error));
    }
  }, [authenticated]);
  return (
    <div>
      {authenticated ? (
        <div>
          <div className="button">
            <button onClick={(e)=>handleClick(e)}>Add task</button>
          </div>
          <HorizontalScrollbar tasks={tasks} setTasks={setTasks} />
        </div>
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
