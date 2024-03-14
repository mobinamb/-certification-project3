import React, { useState } from 'react';
import TaskEdit from './TaskEdit';
import Task from './Task';
import { useDispatch } from 'react-redux';
import { deleteTask, updateTask, setTasks} from './actions';

const TaskList = ({tasks}) => {
  // State for currently edited task ID
  const [editedTaskId, setEditedTaskId] = useState(null);
  const dispatch = useDispatch();
  const handleEditTask = (task) => {
    setEditedTaskId(task.id);
  };

  const handleCloseEdit = () => {
    setEditedTaskId(null);
  };

  // Function to handle task updates (async for file persistence)
  const handleUpdateTask = async (updatedTask) => {
    try {
      // Dispatch the action to update the task in the Redux store
    dispatch(updateTask(updatedTask)); // Dispatch the action with the updated task
    // Close edit form and provide success feedback
    setEditedTaskId(null);
  } catch (error) {
    // Handle errors gracefully
    console.error('Error updating task:', error);
    alert('Failed to update task. Please try again.');
  }
};

const handleTaskDelete = async (taskId) => {
  try {
    // Dispatch the action to delete the task in the Redux store
    dispatch(deleteTask(taskId));


    // Update the list of tasks after deletion
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    dispatch(setTasks(updatedTasks));
  } catch (error) {
    // Handle errors gracefully
    console.error('Error deleting task:', error);
    alert('Failed to delete task. Please try again.');
  }
};

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <li key={task.id}> 
          <Task
            task={task}
            onTaskEdit={handleEditTask}
            onTaskUpdate={handleUpdateTask}
            onTaskDelete={handleTaskDelete} // Pass the handleTaskDelete function as a prop
          />
          {editedTaskId === task.id && (
            <TaskEdit
            task={task}
              onTaskUpdate={handleUpdateTask}
              onClose={() => handleCloseEdit}
            />
          )}
          
        </li>
      ))}
    </ul>
  );
};

export default TaskList;