import React, { useState } from 'react';

const LoginForm = () => {
  // State to manage form fields
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  // Event handler to update form fields on input change
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  // Event handler for form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Logic for handling form submission (e.g., API call)
    console.log('Form submitted:', formData);
    // Clear form fields after submission
    setFormData({
      username: '',
      password: ''
    });
  };

  return (
    <div className="contact-container"> {/* Apply the same container class as the contact form */}
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="contact-form"> {/* Apply the same form class as the contact form */}
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
