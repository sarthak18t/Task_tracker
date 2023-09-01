import React, { useState } from "react";
import "./taskcard.css";
import TaskModal from "./TaskModal";
import imgdel from "../assets/delete.png";

const TaskCard = ({ task }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handlebtn1Click = (e) => {
    const taskId = task._id;
    console.log(taskId);
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${sessionStorage.getItem("auth")}`);
    myHeaders.append("Content-Type", "application/json");
    
    var raw = JSON.stringify({
      "title": task.title,
      "description": task.description,
      "date": task.date,
      "priorityLevel": task.priorityLevel,
      "completed": !task.completed
    });
    
    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    fetch(`http://localhost:3001/task/${taskId}`, requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  };
  const taskDate = new Date(task.date);
  const formattedDate = taskDate.toISOString().split("T")[0];

  return (
    <div className="card">
      <div className="card-details" onClick={handleCardClick}>
        <p className="card-title">Task title : {task.title}</p>
        <p className="card-description">
          Task description : {task.description}
        </p>
        <p className="card-date">Task dueDate : {formattedDate}</p>
      </div>
      <p className="card-priority">Task priority : {task.priorityLevel}</p>
      <div className="card-btn">
        <button className="btn1" onClick={(e) => handlebtn1Click(e)}>
          {task.completed ? "Completed" : "Pending"}
        </button>
        <button className="btn2">
          <img src={imgdel} alt="delete" className="delimg"></img>
        </button>
      </div>
      {isModalOpen && <TaskModal task={task} onClose={handleCloseModal} />}
    </div>
  );
};

export default TaskCard;
