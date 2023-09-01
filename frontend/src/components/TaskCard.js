import React, { useState } from 'react';
import './taskcard.css'; // Import the CSS file
import TaskModal from './TaskModal';
const TaskCard = ({ task }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = () => {
    setIsModalOpen(true);
  }

  const handleCloseModal = () => {
    setIsModalOpen(false);
  }

  return (
    <div className='card'>
      <div className='card-details' onClick={handleCardClick}>
        <p className='card-title'>Task title : {task.title}</p>
        <p className='card-description'>Task description : {task.description}</p>
        <p className='card-date'>Task dueDate : {task.date}</p>
      </div>
      <p className='card-priority'>Task priority : {task.priorityLevel}</p>
      <button>{task.completed ? 'Completed' : 'Pending'}</button>

      {isModalOpen && (
        <TaskModal task={task} onClose={handleCloseModal} />
      )}
    </div>
  );
}

export default TaskCard;
