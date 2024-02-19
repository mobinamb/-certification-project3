import React, { useState, useEffect } from 'react';
import AddTaskForm from './AddTaskForm'; // Import  AddTaskForm component
import TaskList from './TaskList'; // Import TaskList component
import FilterBar from './FilterBar';
// Import necessary functions for file operations (replace with your implementation)
import { readTasksFromFile, writeTasksToFile } from '../utils/fileOperations';
import { Link } from "react-router-dom";

function filterTasks(tasks, selectedFilters) {
  return tasks.filter((task) => {
    // Check each filter condition:
    const priorityMatches = !selectedFilters.priority || task.priority === selectedFilters.priority;
    const statusMatches = !selectedFilters.completion || task.completion === selectedFilters.completion;
    const isTodaysTask = !selectedFilters.todayOnly || isToday(task.dueDate); 

    return priorityMatches && statusMatches && isTodaysTask;
  });
}

// Helper function to check if a task is due today:
/*function isToday(dueDate) {
  const today = new Date();
  const taskDate = new Date(dueDate);
  return today.getFullYear() === taskDate.getFullYear() &&
         today.getMonth() === taskDate.getMonth() &&
         today.getDate() === taskDate.getDate();
}*/

      
function isToday(dueDate) {
  const today = new Date();
  const taskDate = new Date(dueDate);

  // Convert taskDate to the user's local timezone
  const userTimeZoneOffset = today.getTimezoneOffset() / 60;
  taskDate.setHours(taskDate.getHours() + userTimeZoneOffset);

  // Compare dates in the user's local timezone
  return (
    today.toLocaleDateString() === taskDate.toLocaleDateString()
  );
}


const mainApp = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({}); // Track selected filters
  const [isLoading, setIsLoading] = useState(true); // Track loading state
  const [filteredTasks, setFilteredTasks] = useState([]); // Add the missing state variable

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

  const handleFilterChange = (newFilters) => {
    setSelectedFilters({ ...selectedFilters, ...newFilters }); // Update filters
  };

  useEffect(() => {
    // Recalculate filtered tasks based on updated tasks and filters
    const newFilteredTasks = filterTasks(tasks, selectedFilters);
    setFilteredTasks(newFilteredTasks);
  }, [tasks, selectedFilters]);
  //filteredTasks = filterTasks(tasks, selectedFilters); // Apply filters


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
          <FilterBar onFilterChange={handleFilterChange} />
          <TaskList
            tasks={filteredTasks}
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
