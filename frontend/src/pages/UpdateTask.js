import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const UpdateTask = () => {
  const [task, setTask] = useState({});
  const { taskId } = useParams();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDuedate] = useState('');
  const [priorityLevel, setPriorityLevel] = useState('');

  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      `Bearer ${sessionStorage.getItem("auth")}`
    );

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(`http://localhost:3001/task/${taskId}`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        const parseResult = JSON.parse(result);
        setTask(parseResult);
      })
      .catch((error) => console.log("error", error));
  }, [taskId]); 

  useEffect(() => {
    setTitle(task.title || '');
    setDescription(task.description || '');
    setDuedate(task.date || '');
    setPriorityLevel(task.priorityLevel || '');
  }, [task]);

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
      priorityLevel: priorityLevel
    });

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`http://localhost:3001/task/${taskId}`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        window.location.href = '/';
        console.log(result);
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <div className="addtask-form">
      <div>
        <label htmlFor="taskTitle">UPDATE TASK</label>
        <input
          placeholder="Task Title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="addtask-title"
        />
        <input
          placeholder="Task Description"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="addtask-description"
        />
        <input
          placeholder="DueDate : YYYY/MM/DD"
          type="text"
          value={dueDate}
          onChange={(e) => setDuedate(e.target.value)}
          className="addtask-date"
        />
        <input
          placeholder="Task priorityLevel"
          type="number"
          value={priorityLevel}
          onChange={(e) => setPriorityLevel(e.target.value)}
          className="addtask-priority"
        />
      </div>
      <div className="button">
        <button onClick={(e) => handleClick(e)} className="addtask-btn">
          Update Task
        </button>
      </div>
    </div>
  );
};

export default UpdateTask;
