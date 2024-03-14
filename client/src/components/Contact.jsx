import React, { useState } from 'react';
import { Link } from "react-router-dom";

const Contact = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  const validateEmail = (email) => {
    const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*\.\w{2,4}$/;
    return regex.test(email);
  };

  const validateMessage = (message) => {
    return message.trim().length > 0; // Check if message is not empty
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = {};
    if (!validateEmail(email)) {
      errors.email = "Please enter a valid email address.";
    }
    if (!validateMessage(message)) {
      errors.message = "Please enter a message.";
    }

    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      // Send the feedback data (email, message) using your preferred method (e.g., API call)
      console.log("Feedback submitted:", { email, message });
      // Clear form fields and display success message (optional)
      setEmail("");
      setMessage("");
    }
  };

  return (
    <div className="contact-container">    
      <button className="back-to-home-button">
        <Link to="/">Back to Home</Link>
      </button>
      <h2>Contact Us</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className={errors.email ? "error" : ""}
          />
          {errors.email && <p className="error-message">{errors.email}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter your message"
            className={errors.message ? "error" : ""}
          />
          {errors.message && <p className="error-message">{errors.message}</p>}
        </div>
        <button type="submit">Send Feedback</button>
      </form>

      
    </div>
  );
};

export default Contact;
