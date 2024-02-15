import React, { useState } from 'react';

const TaskDelete = ({ taskId, handleDeleteTask }) => {
  // State for confirmation dialog visibility and error message
  const [showConfirm, setShowConfirm] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // ... (existing code for handleDelete and handleConfirmDelete)

  // Handle any errors from handleDeleteTask
  const handleDeleteError = (error) => {
    console.error('Error deleting task:', error);
    setErrorMessage('Failed to delete task. Please try again later.');
    // You can also log the error to a remote server for analysis
  };

  return (
    <div>
      <button onClick={handleDeleteTask}>Delete Task</button>
      {showConfirm && (
        <div className="confirmation-dialog">
          <p>Are you sure you want to delete this task?</p>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <button onClick={() => handleConfirmDelete(true)}>Yes</button>
          <button onClick={() => handleConfirmDelete(false)}>No</button>
        </div>
      )}
    </div>
  );
};

export default TaskDelete;
