import React from 'react';
import './taskcard.css'; // Import the CSS file

const TaskCard = ({ task }) => {
  return (
    <div className='card'>
      <div className='card-details'>
        <p className='card-title'>{task.title}</p>
        <p className='card-description'>{task.description}</p>
        <p className='card-date'>{task.date}</p>
      </div>
      <p className='card-priority'>{task.priorityLevel}</p>
    </div>
  );
}

export default TaskCard;

