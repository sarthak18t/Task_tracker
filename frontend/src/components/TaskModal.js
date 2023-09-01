import React from 'react';
import './taskmodal.css';
import close from '../assets/close.svg';

const TaskModal = ({ task, onClose }) => {
  const handleClick = (e)=>{
    e.preventDefault();
    window.location.href = `/updatetask/${task._id}`
  }
  return (
    <div className="task-details-modal">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          <img src={close} alt='close'/>
        </button>
        <h2>Task Details</h2>
        <p className='card-title'>Task title : {task.title}</p>
        <p className='card-description'>Task description : {task.description}</p>
        <p className='card-date'>Task dueDate : {task.date}</p>
        <p className='card-priority'>Task priority : {task.priorityLevel}</p>
        <div className="button-container">
          <button className="edit-button" onClick={(e)=>handleClick(e)}>Edit Task</button>
          <button className="status-button">
            {task.completed ? 'Completed' : 'Pending'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskModal;
