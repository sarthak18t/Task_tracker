import React from "react";
import "./horizontalScrollbar.css";
import TaskCard from "./TaskCard";

const HorizontalScrollbar = ({ tasks, setTasks }) => (
  <div>
    <div>
      <ul className="scroll-menu">
        {tasks.map((task, index) => (
          <li key={index} className="scroll-menu-item">
            <TaskCard task={task} />
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export default HorizontalScrollbar;
