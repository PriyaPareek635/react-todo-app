import React from 'react';
import './../index.css';

const Task = ({ task, onDelete, onEdit, onToggleComplete }) => {
  return (
    <div className='flex justify-space-between task-item mb-8'>
      <div className='flex flex-column text-wrap'>
        <span className='bold-text fs-16 pb-8'>{task.title}</span>
        <span className='fs-12'>{task.description}</span>
      </div>
      <div className='flex align-center'>
        <button onClick={() => onEdit(task)} className='edit-button'>Edit</button>
        <button onClick={() => onDelete(task.id)} className='delete-button'>Delete</button>
      </div>
    </div>
  );
};

export default Task;
