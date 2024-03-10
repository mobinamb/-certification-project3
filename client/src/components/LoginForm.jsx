import React, { useState } from 'react';
import axios from 'axios';
import '../style.css';
import CreateCategoryForm from './CreateCategoryForm'; // Import CreateCategoryForm
import TaskList from './TaskList'; // Import TaskList component
import config from '../../config';

const LoginForm = () => {
  const [personId, setPersonId] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [tasks, setTasks] = useState(null); // Initialize tasks to null initially

  const [loginFormData, setLoginFormData] = useState({
    loginUsername: '',
    loginPassword: ''
  });

  const [registerFormData, setRegisterFormData] = useState({
    registerUsername: '',
    registerPassword: ''
  });

  const [loginSuccessMessage, setLoginSuccessMessage] = useState('');
  const [registerSuccessMessage, setRegisterSuccessMessage] = useState('');

  const handleLoginInputChange = (event) => {
    const { name, value } = event.target;
    setLoginFormData({ ...loginFormData, [name]: value });
  };

  const handleRegisterInputChange = (event) => {
    const { name, value } = event.target;
    setRegisterFormData({ ...registerFormData, [name]: value });
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
      console.log(personId);
      console.log(categoryId);
      const response = await axios.get(`${config.API_BASE_URL}/api/categories/${personId}/${categoryId}`);
      console.log('Tasks for category:', response.data);
      setTasks(response.data); // Update tasks state with fetched data
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleCategorySelect = (categoryId) => {
    setCategoryId(categoryId);
  };

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

      {/* Render TaskList only if tasks is not null and is an array */}
      {tasks && Array.isArray(tasks) && (
        <TaskList tasks={tasks} />
      )}
    </div>
  );
};

export default LoginForm;
