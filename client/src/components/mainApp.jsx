import React, { useState, useEffect } from 'react';
import AddTaskForm from './AddTaskForm'; // Import  AddTaskForm component
import TaskList from './TaskList'; // Import TaskList component
import FilterBar from './FilterBar';
// Import necessary functions for file operations (replace with your implementation)
import { Link } from "react-router-dom";
import CreateCategoryForm from './CreateCategoryForm'; // Import CreateCategoryForm
import { useSelector, useDispatch } from 'react-redux';
import { addTask, editTask, setFilter, setLoading, setTasks} from './actions';
import config from '../../config';
import axios from 'axios';
function filterTasks(tasks, selectedFilters) {
  return tasks.filter((task) => {
    // Check each filter condition:
    const priorityMatches = !selectedFilters.priority || task.priority === selectedFilters.priority;
    const statusMatches = !selectedFilters.completion || task.completion === selectedFilters.completion;
    const isTodaysTask = !selectedFilters.todayOnly || isToday(task.dueDate); 

    return priorityMatches && statusMatches && isTodaysTask;
  });
}
      
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
  //const [tasks, setTasks] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const tasks = useSelector((state) => state.tasks.tasks);
  const isLoading = useSelector((state) => state.tasks.isLoading); // Access loading state
  const dispatch = useDispatch();
  const selectedFilters = useSelector(state => state.tasks.selectedFilters);
  //const [selectedFilters, setSelectedFilters] = useState({}); // Track selected filters
  //const [isLoading, setIsLoading] = useState(true); // Track loading state
  const [filteredTasks, setFilteredTasks] = useState([]); // Add the missing state variable
  const [file, setFile] = useState(null);
  const [personId, setPersonId] = useState('');




  const handleCategorySelect = (categoryName) => {
    setSelectedCategory(categoryName);
  };

  // Filter tasks based on selected category
  useEffect(() => {
    if (selectedCategory) {
      const filteredTasks = tasks.filter(task => task.category === selectedCategory);
      setFilteredTasks(filteredTasks);
    } else {
      // If no category selected, show all tasks
      setFilteredTasks(tasks);
    }
  }, [selectedCategory, tasks]);




  const readTasksFromFile = async (file) => {
    try {
        const tasksJSON = await file.text(); // Read file content directly
        return JSON.parse(tasksJSON);
    } catch (error) {
        console.error('Error reading tasks from file:', error);
        return [];
    }
  };

  // Function to save tasks to a JSON file
  const saveTasksToFile = async (filteredTasks) => {
    try {
      const tasksJSON = JSON.stringify(filteredTasks, null, 2);
      const blob = new Blob([tasksJSON], { type: 'application/json' });
  
      // Request user permission to save a file
      const fileHandle = await window.showSaveFilePicker();
  
      // Create a writable stream to the file
      const writableStream = await fileHandle.createWritable();
  
      // Write data to the file
      await writableStream.write(blob);
  
      // Close the file
      await writableStream.close();
  
      console.log('Tasks saved successfully!');
    } catch (error) {
      console.error('Error saving tasks:', error);
    }
  };
  
  
// Button click handler to trigger the save operation
const handleSaveButtonClick = async (filteredTasks) => {
  try {
    // Save filtered tasks to JSON file
    await saveTasksToFile(filteredTasks);
  } catch (error) {
    console.error('Error saving tasks:', error);
  }
};

  // Function to handle file selection
  const handleFileChange = async (event) => {
    const file = event.target.files[0]; // Get the selected file
    if (!file || file.length === 0) {
      console.error('No file selected'); // Handle the case of no file selected
      return; // No file selected
    }

    try {
      const loadedTasks = await readTasksFromFile(file); // Pass the file object directly
      //setTasks(loadedTasks);
      dispatch(setTasks(loadedTasks));
      setFile(file);
  } catch (error) {
      console.error('Error reading file:', error);
  }
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        if(file){
        const loadedTasks = await readTasksFromFile(file);
        //setTasks(loadedTasks);
        dispatch(setTasks(loadedTasks));
        }
      } catch (error) {
        console.error('Error fetching tasks:', error);
        // Handle error gracefully (e.g., display an error message)
      } finally {
        //setIsLoading(false);
        dispatch(setLoading(false)); // Update isLoading state using redux action
      }
    };

    fetchTasks();
  }, [file,dispatch]);


  const handleTaskAdd = async (newTask) => {
    try {
      // Make a POST request to your backend API
      const response = await axios.post(`${config.API_BASE_URL}/api/tasks`, newTask);
      console.log('Task added successfully:', response.data);
      // Optionally, you can update the local state or trigger any other actions upon successful addition
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const handleTaskEdit = async (updatedTask) => {
    try {
      const updatedTasks = tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task));
      //setTasks(updatedTasks); // Update state immediately for UI feedback
      dispatch(editTask(updatedTasks));
    } catch (error) {
      console.error('Error updating task:', error);
      // Handle error gracefully (e.g., revert local state update)
    }
  };

  const handleFilterChange = (newFilters) => {
    //setSelectedFilters({ ...selectedFilters, ...newFilters }); // Update filters
    dispatch(setFilter(newFilters));
  };

  useEffect(() => {
    // Recalculate filtered tasks based on updated tasks and filters
    const newFilteredTasks = filterTasks(tasks, selectedFilters);
    setFilteredTasks(newFilteredTasks);
  }, [tasks, selectedFilters]);


  return (
    <div className="app-container">
      
      <button className="back-to-home-button">
      <Link to="/">Back to Home</Link>
    </button>
    
      <h1>My Quiz Task List</h1>
      {isLoading ? (
        <p>Loading tasks...</p>
      ) : (

        <>
          {/* File input for selecting JSON file */}
          <input type="file" onChange={handleFileChange} accept=".json" />
          
          <button onClick={() => handleSaveButtonClick(filterTasks(tasks, selectedFilters))}>Save Filtered Tasks</button>
          
          <AddTaskForm onTaskAdd={handleTaskAdd} />
          <FilterBar onFilterChange={handleFilterChange} />
          <TaskList
            tasks={filteredTasks}
            onTaskEdit={handleTaskEdit}
            //setTasks={setTasks}
          />
        </>
      )}
    </div>
  );

  
};

export default mainApp;