import React, { useState, useEffect } from 'react';
import AddTaskForm from './AddTaskForm'; // Import  AddTaskForm component
import TaskList from './TaskList'; // Import TaskList component
import tasksData from '../../data/tasks.json';


const mainApp = () => {
  // State to store task data
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    
    const tasks = JSON.parse(tasksData);
    setTasks(tasks);

  }, []);
  
  // Functions to handle task management
  const handleTaskAdd = (newTask) => {
    // Add new task to the tasks array and update state
    setTasks([...tasks, newTask]);
  };

  const handleTaskDelete = (taskId) => {
    // Filter out the task with the given ID and update state
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const handleTaskEdit = (updatedTask) => {
    // Find the task with the given ID and update its data
    setTasks(
      tasks.map((task) => {
        if (task.id === updatedTask.id) {
          return updatedTask;
        }
        return task;
      })
    );
  };

  return (
    <div className="app-container">
      <h1>My Quiz Task List</h1>
      <AddTaskForm onTaskAdd={handleTaskAdd} /> {/*  AddTaskForm component */}
      <TaskList tasks={tasks} onTaskDelete={handleTaskDelete} onTaskEdit={handleTaskEdit} /> {/*  TaskList component */}
    </div>
  );
};

export default mainApp;
