import React, { useState } from 'react';
import TaskEdit from './TaskEdit';
import Task from './Task';

import { readTasksFromFile, writeTasksToFile } from '../utils/fileOperations';

const TaskList = ({ tasks, onTaskDelete, setTasks}) => {
  // State for currently edited task ID
  const [editedTaskId, setEditedTaskId] = useState(null);

  const handleEditTask = (task) => {
    setEditedTaskId(task.id);
  };

  const handleCloseEdit = () => {
    setEditedTaskId(null);
  };

  // Function to handle task updates (async for file persistence)
  const handleUpdateTask = async (updatedTask) => {
    try {
      
      // 1. Update tasks state directly for immediate UI update
      const taskIndex = tasks.findIndex((task) => task.id === updatedTask.id);

      if (taskIndex !== -1) {
        // 2. Update the task in the state directly for immediate UI feedback
        tasks[taskIndex] = updatedTask;
        setTasks([...tasks]); // Trigger a re-render with the updated state

        // 2. Persist changes asynchronously
        await writeTasksToFile(tasks);
    
        // 3. Close edit form and provide success feedback
        setEditedTaskId(null);

        //alert('Task updated successfully!');

      } else {
        console.error('Task with ID', updatedTask.id, 'not found.');
      }
    } catch (error) {
      // Handle errors gracefully
      console.error('Error updating task:', error);
      alert('Failed to update task. Please try again.');
    }
  };

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <li key={task.id}> 
          <Task
            task={task}
            onTaskDelete={() => onTaskDelete(task.id)}
            onTaskEdit={() => handleEditTask(task.id)}
            onTaskUpdate={(updatedTask) => handleUpdateTask(updatedTask)}
          />
          {editedTaskId === task.id && (
            <TaskEdit
            task={task}
              onTaskUpdate={handleUpdateTask}
              onClose={() => handleCloseEdit(task.id)}
            />
          )}
          
        </li>
      ))}
    </ul>
  );
};

export default TaskList;