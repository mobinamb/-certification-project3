import React, { useState, useEffect } from 'react';
import AddTaskForm from './AddTaskForm'; // Import  AddTaskForm component
import TaskList from './TaskList'; // Import TaskList component
// Import necessary functions for file operations (replace with your implementation)
import { readTasksFromFile, writeTasksToFile } from '../utils/fileOperations';
import { Link } from "react-router-dom";


const mainApp = () => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Track loading state

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const loadedTasks = await readTasksFromFile();
        setTasks(loadedTasks);
      } catch (error) {
        console.error('Error fetching tasks:', error);
        // Handle error gracefully (e.g., display an error message)
      } finally {
        setIsLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const handleTaskAdd = async (newTask) => {
    try {
      newTask.id = Date.now();
      setTasks([...tasks, newTask]); // Update state immediately for UI feedback
      await writeTasksToFile([...tasks, newTask]); // Update file asynchronously
    } catch (error) {
      console.error('Error adding task:', error);
      // Handle error gracefully (e.g., revert local state update)
    }
  };

  const handleTaskDelete = async (taskId) => {
    try {
      const updatedTasks = tasks.filter((task) => task.id !== taskId);
      setTasks(updatedTasks); // Update state immediately for UI feedback
      await writeTasksToFile(updatedTasks); // Update file asynchronously
    } catch (error) {
      console.error('Error deleting task:', error);
      // Handle error gracefully (e.g., revert local state update)
    }
  };

  const handleTaskEdit = async (updatedTask) => {
    try {
      const updatedTasks = tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task));
      setTasks(updatedTasks); // Update state immediately for UI feedback
      await writeTasksToFile(updatedTasks); // Update file asynchronously
    } catch (error) {
      console.error('Error updating task:', error);
      // Handle error gracefully (e.g., revert local state update)
    }
  };

  return (
    <div className="app-container">
      <Link to="/">
        <h1>Back to Home</h1>
      </Link>
      <h1>My Quiz Task List</h1>
      {isLoading ? (
        <p>Loading tasks...</p>
      ) : (
        <>
          <AddTaskForm onTaskAdd={handleTaskAdd} />
          <TaskList
            tasks={tasks}
            onTaskDelete={handleTaskDelete}
            onTaskEdit={handleTaskEdit}
            setTasks={setTasks}
          />
        </>
      )}
    </div>
  );
};

export default mainApp;
