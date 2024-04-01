import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../../config';
import AddTaskForm from './AddTaskForm';

const CreateCategoryForm = ({ personId, onCreateCategory, selectedFilters }) => {
  const [categoryName, setCategoryName] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [categories, setCategories] = useState([]);
  const [visibleTasks, setVisibleTasks] = useState({});
  const [categoryTasks, setCategoryTasks] = useState({});
  const [showAddTaskForm, setShowAddTaskForm] = useState({});

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${config.API_BASE_URL}/api/categories/${personId}`);
      setCategories(response.data);
      const initialVisibilityState = response.data.reduce((acc, category) => {
        acc[category.id] = false;
        return acc;
      }, {});
      setVisibleTasks(initialVisibilityState);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleCategoryDelete = async (categoryIdToDelete) => {
    try {
      await axios.delete(`${config.API_BASE_URL}/api/categories/${personId}/${categoryIdToDelete}`);
      setCategories(prevCategories => prevCategories.filter(category => category._id !== categoryIdToDelete));
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  const handleShowTasks = async (categoryId) => {
    try {
      const response = await axios.get(`${config.API_BASE_URL}/api/categories/${personId}/${categoryId}`);
      const taskIds = response.data.tasks;

      const tasks = await Promise.all(taskIds.map(async (taskId) => {
        const taskResponse = await axios.get(`${config.API_BASE_URL}/api/tasks/${taskId}`);
        return taskResponse.data; // Assuming task details are returned in the response
      }));

      console.log(tasks);


      setVisibleTasks(prevState => ({ ...prevState, [categoryId]: true }));
      setCategoryTasks(tasks);
      setShowAddTaskForm(prevState => ({ ...prevState, [categoryId]: false }));
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleAddTaskButtonClick = (categoryId) => {
    setShowAddTaskForm(prevState => ({ ...prevState, [categoryId]: true }));
  };

  const handleCategorySubmit = async (event) => {
    event.preventDefault();
    try {
      const existingCategory = categories.find(category => category.name === categoryName);
      if (existingCategory) {
        setErrorMessage('Category already exists.');
        return;
      }
      const createResponse = await axios.post(`${config.API_BASE_URL}/api/categories/${personId}`, {
        name: categoryName
      });
      setSuccessMessage('Category created successfully');
      fetchCategories();
      if (onCreateCategory) {
        onCreateCategory(createResponse.data.id);
      }
    } catch (error) {
      console.error('Error creating category:', error);
      setErrorMessage('Error creating category');
    }
  };

  // Function to handle adding a new task
  const handleTaskAdd = async (categoryId, newTask) => {
    try {
      // Make API call to add the task to the category with categoryId
      await axios.post(`${config.API_BASE_URL}/api/tasks/${categoryId}`, newTask);
      // Refresh category tasks
      handleShowTasks(categoryId);
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  // TaskDisplay component code
  const TaskDisplay = ({ tasks }) => {
    return (
      <div>
        {/* Render tasks */}
        {tasks.map((task) => (
          <div key={task.id}>
            {/* Render task details */}
            <p>Title: {task.title}</p>
            <p>Priority: {task.priority}</p>
            <p>Completion: {task.completion}</p>
            <p>Due Date: {task.dueDate}</p>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      <h2>Create New Category</h2>
      {successMessage && <p>{successMessage}</p>}
      {errorMessage && <p>{errorMessage}</p>}
      <form onSubmit={handleCategorySubmit}>
        <label htmlFor="categoryName">Category Name:</label>
        <input
          type="text"
          id="categoryName"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          required
        />
        <button type="submit">Create Category</button>
      </form>
      <div>
        <h3>Existing Categories</h3>
        <ul>
          {categories.map(category => (
            <li key={category._id}>
              {category.name}{' '}
              <button onClick={() => handleCategoryDelete(category._id)}>Delete</button>{' '}
              <button onClick={() => handleShowTasks(category._id)}>Show Tasks</button>
              <button onClick={() => handleAddTaskButtonClick(category._id)}>Edit Task</button>
              {visibleTasks[category._id] && (
                <TaskDisplay tasks={categoryTasks} />
              )}
              {showAddTaskForm[category._id] && (
                <AddTaskForm onTaskAdd={(newTask) => handleTaskAdd(category._id, newTask)} />
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CreateCategoryForm;
