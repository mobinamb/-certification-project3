import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CreateCategoryForm from './CreateCategoryForm';
import TaskList from './TaskList';
import AddTaskForm from './AddTaskForm';
import FilterBar from './FilterBar';
import { filterTasks } from './FilterBar'; // Import filterTasks helper function
import config from '../../config';
import '../style.css';

const LoginForm = () => {
  const [registerSuccessMessage, setRegisterSuccessMessage] = useState('');
  const [personId, setPersonId] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [loginFormData, setLoginFormData] = useState({
    loginUsername: '',
    loginPassword: ''
  });

  const [registerFormData, setRegisterFormData] = useState({
    registerUsername: '',
    registerPassword: ''
  });
  const [tasks, setTasks] = useState([]);
  const [loginSuccessMessage, setLoginSuccessMessage] = useState('');
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({
    // Define your initial filters here
  });

  const handleCategorySelect = (categoryName) => {
    setCategoryId(categoryName);
  };

  const handleLoginInputChange = (event) => {
    const { name, value } = event.target;
    setLoginFormData({ ...loginFormData, [name]: value });
  };

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${config.API_BASE_URL}/api/login`, {
        username: loginFormData.loginUsername,
        password: loginFormData.loginPassword
      });
      document.cookie = `token=${response.data.token};path=/;max-age=3600`;
      setLoginSuccessMessage('Login successful!');
      setPersonId(response.data.personId);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleRegisterInputChange = (event) => {
    const { name, value } = event.target;
    setRegisterFormData({ ...registerFormData, [name]: value });
  };

  const handleRegisterSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${config.API_BASE_URL}/api/people`, {
        username: registerFormData.registerUsername,
        password: registerFormData.registerPassword
      });
      setRegisterSuccessMessage('Registration successful!');
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  const handleFetchTasks = async () => {
    try {
      const response = await axios.get(`${config.API_BASE_URL}/api/categories/${personId}/${categoryId}`);
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleTaskAdd = async (newTask) => {
    try {
      // Add the new task to the tasks array
      setTasks([...tasks, newTask]);
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const handleTaskEdit = async (updatedTask) => {
    try {
      // Find the index of the updated task in the tasks array
      const index = tasks.findIndex(task => task.id === updatedTask.id);
      // Create a copy of the tasks array
      const updatedTasks = [...tasks];
      // Replace the old task with the updated task
      updatedTasks[index] = updatedTask;
      // Update the tasks state
      setTasks(updatedTasks);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleFilterChange = (newFilters) => {
    // Update the selectedFilters state with the new filters
    setSelectedFilters(newFilters);
  };

  useEffect(() => {
    // Filter the tasks based on the selected filters
    const newFilteredTasks = filterTasks(tasks, selectedFilters);
    setFilteredTasks(newFilteredTasks);
  }, [tasks, selectedFilters]);

  return (
    <div className="login-container">
      <CreateCategoryForm personId={personId} onCreateCategory={handleCategorySelect} />
      <button onClick={handleFetchTasks}>Fetch Tasks</button>
      <div className="form-box">
        <h2>Login</h2>
        <form onSubmit={handleLoginSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="loginUsername">Username:</label>
            <input
              type="text"
              id="loginUsername"
              name="loginUsername"
              value={loginFormData.loginUsername}
              onChange={handleLoginInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="loginPassword">Password:</label>
            <input
              type="password"
              id="loginPassword"
              name="loginPassword"
              value={loginFormData.loginPassword}
              onChange={handleLoginInputChange}
              required
            />
          </div>
          <button type="submit">Login</button>
          {loginSuccessMessage && <p>{loginSuccessMessage}</p>}
          </form>
      </div>
      <div className="form-box">
        <h2>Register</h2>
        <form onSubmit={handleRegisterSubmit} className="register-form">
          <div className="form-group">
            <label htmlFor="registerUsername">Username:</label>
            <input
              type="text"
              id="registerUsername"
              name="registerUsername"
              value={registerFormData.registerUsername}
              onChange={handleRegisterInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="registerPassword">Password:</label>
            <input
              type="password"
              id="registerPassword"
              name="registerPassword"
              value={registerFormData.registerPassword}
              onChange={handleRegisterInputChange}
              required
            />
          </div>
          <button type="submit">Register</button>
          {registerSuccessMessage && <p>{registerSuccessMessage}</p>}
        </form>
      </div>
      {/* Render FilterBar, AddTaskForm, and TaskList */}
      <FilterBar onFilterChange={handleFilterChange} />
      <AddTaskForm onTaskAdd={handleTaskAdd} />
      <TaskList tasks={filteredTasks} onTaskEdit={handleTaskEdit} />
    </div>
  );
};

export default LoginForm
