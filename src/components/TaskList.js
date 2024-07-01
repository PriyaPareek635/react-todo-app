import React from 'react';
import Task from './Task';

const TaskList = ({ tasks, onEdit, onDelete, onChangeStatus }) => {
  return (
    <div className="task-list">
      {tasks.map(task => (
        <Task
          key={task.id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
          onChangeStatus={onChangeStatus}
        />
      ))}
    </div>
  );
};

export default TaskList;
