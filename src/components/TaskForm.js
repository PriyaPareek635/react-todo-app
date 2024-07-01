import React, { useState } from 'react';

const TaskForm = ({ onSubmit, initialValues }) => {
  const [task, setTask] = useState(initialValues || { title: '', description: '', priority: 'medium' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(task);
    setTask({ title: '', description: '', priority: 'medium' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        value={task.title}
        onChange={handleChange}
        placeholder="Task Title"
        required
      />
      <textarea
        name="description"
        value={task.description}
        onChange={handleChange}
        placeholder="Task Description"
        required
      ></textarea>
      <select name="priority" value={task.priority} onChange={handleChange}>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>
      <button type="submit">Submit</button>
    </form>
  );
};

export default TaskForm;
