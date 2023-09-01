import React, { useState } from "react";
import "./addtask.css";

const AddTask = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDuedate] = useState("");
  const [priorityLevel, setPriorityLevel] = useState();

  const handleClick = (e) => {
    e.preventDefault();
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      `Bearer ${sessionStorage.getItem("auth")}`
    );
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      title: title,
      description: description,
      date: dueDate,
      priorityLevel: priorityLevel,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:3001/task", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        const parseResult = JSON.parse(result);
        if(parseResult.error){
          alert(parseResult.error);
        }
        else{
          alert("task added successfully")
          window.location.href = "/"
        }
      })
      .catch((error) => {
        console.log("error", error)

      });
  };
  return (
    <div className="addtask-form">
      <div>
        <label htmlFor="taskTitle">ADD TASK</label>
        <input
          placeholder="Task Title"
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          className="addtask-title"
        />
        <input
          placeholder="Task Description"
          type="text"
          onChange={(e) => setDescription(e.target.value)}
          className="addtask-description"
        />
        <input
          placeholder="DueDate : YYYY/MM/DD"
          type="text"
          onChange={(e) => setDuedate(e.target.value)}
          className="addtask-date"
        />
        <input
          placeholder="Task priorityLevel"
          type="number"
          onChange={(e) => setPriorityLevel(e.target.value)}
          className="addtask-priority"
        />
      </div>
      <div className="button">
        <button onClick={(e) => handleClick(e)} className="addtask-btn">
          Add Task
        </button>
      </div>
    </div>
  );
};

export default AddTask;
