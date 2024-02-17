import React, { useState } from 'react';

const TaskEdit = ({ task, handleUpdateTask, onClose }) => {
  // State for form fields (pre-populated with task data)
  const [title, setTitle] = useState(task.title);
  const [status, setStatus] = useState(task.status);
  const [priority, setPriority] = useState(task.priority);
  const [completion, setCompletion] = useState(task.priority);
  const [dueDate, setDueDate] = useState(task.dueDate);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation (expand as needed)
    if (!title || !status || !priority || !completion || !dueDate) {
      alert('Please fill in all fields.');
      return;
    }

    // Prepare updated task data
    const updatedTask = {
      id: task.id,
      title,
      status,
      priority,
      completion,
      dueDate,
      };
  
      // Pass updated task to parent component for handling
      onTaskUpdate(updatedTask);
    };
  
    return (
      <form onSubmit={handleSubmit}>
        {/* Input fields for task data */}
        <button type="submit">Save Changes</button>
      </form>
    );
  };
  
  export default TaskEdit;