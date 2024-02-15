import React from 'react';

const Task = ({ task, onTaskDelete, onTaskEdit }) => {
  // **Description:**
  // This component renders the details of an individual task.
  // It accepts props for the task data, a function to handle task deletion, and a function to handle task editing.

  const { title, priority, dueDate } = task; // Destructure task data for easier access

  return (
    <li className="task-item">
      <h3>{title}</h3>
      <p>Priority: {priority}</p>
      {dueDate && <p>Due Date: {dueDate}</p>} {/* Conditionally display due date if present */}
      <div className="task-actions">
        <button onClick={() => onTaskDelete(task.id)}>Delete</button>
        <button onClick={() => onTaskEdit(task)}>Edit</button>
      </div>
    </li>
  );
};

export default Task;
