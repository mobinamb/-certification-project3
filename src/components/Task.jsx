import React, { useState } from 'react';

const Task = ({ task, onTaskEdit, onTaskUpdate, onTaskDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTask, setUpdatedTask] = useState({ ...task }); // Initialize with original task data

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validation logic
    const isValid =
      updatedTask.title && updatedTask.priority && updatedTask.completion && (updatedTask.dueDate || !updatedTask.dueDate);

    if (isValid) {
      onTaskUpdate(updatedTask);
      setIsEditing(false);
    } else {
      alert('Please fill in all required fields.'); // Basic validation alert
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUpdatedTask({ ...updatedTask, [name]: value });
  };

  return (
    <div className="task-item">
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <h3>Edit Task</h3>
          <input
            type="text"
            name="title"
            value={updatedTask.title}
            onChange={handleInputChange}
            placeholder="Title"
            required // HTML5 validation for title
          />
          <select
            name="priority"
            value={updatedTask.priority}
            onChange={handleInputChange}
            required // HTML5 validation for priority
          >
            <option value="">Select Completion</option>
            <option value="low">low</option>
            <option value="medium">medium</option>
            <option value="high">high</option>
          </select>

          <select
            name="completion"
            value={updatedTask.completion}
            onChange={handleInputChange}
            required // HTML5 validation for completion
          >
            <option value="">Select Completion</option>
            <option value="todo">todo</option>
            <option value="in progress">in progress</option>
            <option value="completed">completed</option>
          </select>

          <input
            type="date"
            name="dueDate"
            value={updatedTask.dueDate}
            onChange={handleInputChange}
          />
          <button type="submit">Save Changes</button>
        </form>
      ) : (
        <>
          <h3>{task.title}</h3>
          <p>Priority: {task.priority}</p>
          <p>Completion: {task.completion}</p>
          {task.dueDate && <p>Due Date: {task.dueDate}</p>}
          <div className="task-actions">
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={() =>onTaskDelete(task.id)}>Delete</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Task;
