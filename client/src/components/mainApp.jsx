import React, { useState, useEffect } from 'react';
import AddTaskForm from './AddTaskForm'; // Import AddTaskForm component
import TaskList from './TaskList'; // Import TaskList component
import FilterBar from './FilterBar';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { addTask, editTask, setFilter, setLoading, setTasks} from './actions';
import config from '../../config';
import axios from 'axios';
import CreateCategoryForm from './CreateCategoryForm'; // Import CreateCategoryForm component

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

  const userTimeZoneOffset = today.getTimezoneOffset() / 60;
  taskDate.setHours(taskDate.getHours() + userTimeZoneOffset);

  return (
    today.toLocaleDateString() === taskDate.toLocaleDateString()
  );
}

const MainApp = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const tasks = useSelector((state) => state.tasks.tasks);
  const isLoading = useSelector((state) => state.tasks.isLoading); 
  const dispatch = useDispatch();
  const selectedFilters = useSelector(state => state.tasks.selectedFilters);
  const [filteredTasks, setFilteredTasks] = useState([]); 
  const [file, setFile] = useState(null);
  const [personId, setPersonId] = useState('');
  
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        dispatch(setLoading(true));
        const response = await axios.get(`${config.API_BASE_URL}/api/tasks/${selectedCategory}`);
        dispatch(setTasks(response.data));
        dispatch(setLoading(false));
      } catch (error) {
        console.error('Error fetching tasks:', error);
        dispatch(setLoading(false));
      }
    };

    if (selectedCategory) {
      fetchTasks();
    }
  }, [selectedCategory, dispatch]);

  const handleCategorySelect = (categoryName) => {
    setSelectedCategory(categoryName);
  };

  const readTasksFromFile = async (file) => {
    try {
        const tasksJSON = await file.text();
        return JSON.parse(tasksJSON);
    } catch (error) {
        console.error('Error reading tasks from file:', error);
        return [];
    }
  };

  const saveTasksToFile = async (filteredTasks) => {
    try {
      const tasksJSON = JSON.stringify(filteredTasks, null, 2);
      const blob = new Blob([tasksJSON], { type: 'application/json' });
  
      const fileHandle = await window.showSaveFilePicker();
  
      const writableStream = await fileHandle.createWritable();
  
      await writableStream.write(blob);
  
      await writableStream.close();
  
      console.log('Tasks saved successfully!');
    } catch (error) {
      console.error('Error saving tasks:', error);
    }
  };
  
  const handleSaveButtonClick = async (filteredTasks) => {
    try {
      await saveTasksToFile(filteredTasks);
    } catch (error) {
      console.error('Error saving tasks:', error);
    }
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0]; 
    if (!file || file.length === 0) {
      console.error('No file selected');
      return; 
    }

    try {
      const loadedTasks = await readTasksFromFile(file); 
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
        dispatch(setTasks(loadedTasks));
        }
      } catch (error) {
        console.error('Error fetching tasks:', error);
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchTasks();
  }, [file,dispatch]);

  const handleTaskAdd = async (newTask) => {
    try {
      const response = await axios.post(`${config.API_BASE_URL}/api/tasks`, newTask);
      console.log('Task added successfully:', response.data);
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const handleTaskEdit = async (updatedTask) => {
    try {
      const updatedTasks = tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task));
      dispatch(editTask(updatedTasks));
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleFilterChange = (newFilters) => {
    dispatch(setFilter(newFilters));
  };

  useEffect(() => {
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
          <input type="file" onChange={handleFileChange} accept=".json" />
          <button onClick={() => handleSaveButtonClick(filterTasks(tasks, selectedFilters))}>Save Filtered Tasks</button>
          <CreateCategoryForm onCreateCategory={handleCategorySelect} />
          <AddTaskForm onTaskAdd={handleTaskAdd} />
          <FilterBar onFilterChange={handleFilterChange} />
          <TaskList
            tasks={filteredTasks}
            onTaskEdit={handleTaskEdit}
          />
        </>
      )}
    </div>
  );
};

export default MainApp;
