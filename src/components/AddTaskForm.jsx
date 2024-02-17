import React, { useState } from 'react';

const AddTaskForm = ({ onTaskAdd }) => {
  // State for form fields and error messages
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('');
  const [completion, setCompletion] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [additionalFields, setAdditionalFields] = useState({});
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    // Reset errors before validation
    setErrors({});

    const isValid = validateForm();

    if (isValid) {
      // Combine state values and additional fields into a newTask object
      const newTask = {
        title,
        priority,
        completion,
        dueDate
      };

      onTaskAdd(newTask);

      // Reset form fields after submission
      setTitle('');
      setPriority('');
      setCompletion('');
      setDueDate('');
    }
  };

  const validateForm = () => {
    let isValid = true;
    const errors = {};

    if (!title) {
      isValid = false;
      errors.title = "Title is required.";
    }

    if (!priority) {
      isValid = false;
      errors.priority = "Priority is required.";
    }

    if (!completion) {
      isValid = false;
      errors.completion = "completion is required.";
    }

    if (!dueDate) {
      isValid = false;
      errors.dueDate = "Due date is required.";
    }

    // Validate other fields as needed (e.g., date format, length)

    setErrors(errors);
    return isValid;
  };

  // ... (rest of the component JSX, including input fields)

  return (
    <form onSubmit={handleSubmit}>
      {/* Input fields with error messages */}
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task Title"
        {...(errors.title && { error: true, errorMessage: errors.title })}
      />
      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="">Select Priority</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <select value={completion} onChange={(e) => setCompletion(e.target.value)}>
        <option value="">Select Completion</option>
        <option value="todo">todo</option>
        <option value="in progress">in progress</option>
        <option value="completed">completed</option>
      </select>

      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        placeholder="Due Date"
        {...(errors.dueDate && { error: true, errorMessage: errors.dueDate })}
      />
      {/* ... (other input fields) */}
      {Object.keys(errors).length > 0 && (
        <div className="error-message">Please fix the following errors:</div>
      )}
      {Object.entries(errors).map(([field, message]) => (
        <li key={field} className="error-details">
          - {message}
        </li>
      ))}
      <button type="submit">Add Task</button>
    </form>
  );
};

export default AddTaskForm;
