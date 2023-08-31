import React, { useContext } from "react";
import './horizontalScrollbar.css'
import TaskCard from "./TaskCard";


const HorizontalScrollbar = ({ tasks, setTasks }) => (
  <div className="scroll-menu-container">
    <ul className="scroll-menu">
      {tasks.map((task, index) => (
        <li key={index} className="scroll-menu-item">
          <TaskCard task={task} />
        </li>
      ))}
    </ul>
  </div>
);

export default HorizontalScrollbar;


