import React, { useState } from 'react';
import axios from 'axios';
import '../style.css';

import config from '../../config';

const LoginForm = () => {
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
      // Redirect or update state to reflect logged-in state
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
      // Handle registration success if needed
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <div className="login-container">
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
    </div>
  );
};

export default LoginForm;
