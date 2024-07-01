import React from 'react';

const Task = ({ task, onEdit, onDelete, onChangeStatus }) => {
  const { id, title, description, priority } = task;

  const handleEditClick = () => {
    onEdit(task); // Pass the entire task to App.js file for editing
  };

  const handleChangeStatus = (newStatus) => {
    onChangeStatus(id, newStatus);
  };


  return (
    <div className="task grid task-item mb-8">
      <div className='flex flex-column text-wrap'>
        <span className='bold-text fs-16 pb-8'>{title}</span>
        <span className='fs-12 pb-8'>{description}</span>
        <div>
          <p className={`priority fs-12 ${priority === 'high' ? 'high-priority' : 
            priority === 'medium' ? 'medium-priority' : 'low-priority'}`}>{priority}</p>
        </div>
      </div>
      <div className='flex flex-column'>
        <div className="task-actions">
          <div className="ellipsis-menu">
            <div className="ellipsis"></div>
            <div className="ellipsis"></div>
            <div className="ellipsis"></div>
            <div className="dropdown-content">
              <button onClick={() => handleChangeStatus('todo')}>To Do</button>
              <button onClick={() => handleChangeStatus('inprogress')}>In Progress</button>
              <button onClick={() => handleChangeStatus('completed')}>Completed</button>
            </div>
          </div>
        </div>
        <button onClick={() => handleEditClick(task)} className='edit-button'>Edit</button>
        <button onClick={() => onDelete(task.id)} className='delete-button'>Delete</button>
      </div>
    </div>
  );
};

export default Task;
