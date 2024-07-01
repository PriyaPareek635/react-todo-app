// App.js
import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [editTask, setEditTask] = useState(null);

  // to show the tasks into the different lists
  const [todoTasks, setTodoTasks] = useState([]);
  const [inProgressTasks, setInProgressTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);

  // Load the tasks from localStorage on component if the tasks array is not empty
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
    categorizeTasks(storedTasks); // divide the tasks into different lists based on categories
  }, []);

  // to save tasks data in the localStorage
  const saveTasksToLocalStorage = (updatedTasks) => {
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  // divide the tasks into different lists
  const categorizeTasks = (tasks) => {
    const todoList = tasks.filter(task => task.status === 'todo');
    const inProgressList = tasks.filter(task => task.status === 'inprogress');
    const completedList = tasks.filter(task => task.status === 'completed');
    setTodoTasks(todoList);
    setInProgressTasks(inProgressList);
    setCompletedTasks(completedList);
  };

  // add the tasks into the list
  const handleAddTask = (newTask) => {
    const taskWithId = { ...newTask, id: Date.now(), status: 'todo' };
    const updatedTasks = [...tasks, taskWithId];
    setTasks(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);
    categorizeTasks(updatedTasks); // Update category based on status
  };

  // to edit an existing task
  const handleEditTask = (editedTask) => {
    const updatedTasks = tasks.map(task => (task.id === editedTask.id ? editedTask : task));
    setTasks(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);
    categorizeTasks(updatedTasks);
    setEditTask(null);
  };

  // to delete a task
  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);
    categorizeTasks(updatedTasks);
    setEditTask(null);
  };

  // to change task status
  const handleChangeStatus = (taskId, newStatus) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, status: newStatus } : task
    );
    setTasks(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);
    categorizeTasks(updatedTasks);
  };

  return (
    <div className="App">
      <h1>Task Manager</h1>
      <TaskForm onSubmit={handleAddTask} />
      <div className="task-sections">
        <div className="task-section">
          <h2>To Do</h2>
          <TaskList
            tasks={todoTasks}
            onEdit={setEditTask} 
            onDelete={handleDeleteTask}
            onChangeStatus={handleChangeStatus}
          />
        </div>
        <div className="task-section">
          <h2>In Progress</h2>
          <TaskList
            tasks={inProgressTasks}
            onEdit={setEditTask} 
            onDelete={handleDeleteTask}
            onChangeStatus={handleChangeStatus} 
          />
        </div>
        <div className="task-section">
          <h2>Completed</h2>
          <TaskList
            tasks={completedTasks}
            onEdit={setEditTask} 
            onDelete={handleDeleteTask}
            onChangeStatus={handleChangeStatus}
          />
        </div>
      </div>
      {editTask && (
        <div className="edit-form">
          <h2>Edit Task</h2>
          <TaskForm onSubmit={handleEditTask} initialValues={editTask} />
        </div>
      )}
    </div>
  );
};

export default App;
