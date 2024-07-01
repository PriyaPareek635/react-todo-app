import React, { useState } from "react";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import TaskEditForm from "./components/TaskEditForm";
import "./App.css";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  const addTask = (task) => {
    setTasks([...tasks, { ...task, id: Date.now() }]);
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const editTask = (task) => {
    setEditingTask(task);
  };

  const saveTask = (editedTask) => {
    setTasks(
      tasks.map((task) => (task.id === editedTask.id ? editedTask : task))
    );
    setEditingTask(null);
  };

  return (
    <div className="App">
      <h1>Todo App</h1>
      {
        // if we are editing task, then it should be visible in the task form to edit the changes
        editingTask ? (
          <TaskEditForm task={editingTask} onSave={saveTask} />
        ) : (
        //to add the new task
          <TaskForm onAdd={addTask} />
        )
      }
      {/* to display the list of tasks */}
      <TaskList tasks={tasks} onDelete={deleteTask} onEdit={editTask} />
    </div>
  );
};

export default App;
