import React, { useState } from 'react';
import TaskEdit from './TaskEdit';
import Task from './Task';
import { useDispatch } from 'react-redux';
import { deleteTask, updateTask, setTasks} from './actions';

const TaskList = ({ tasks }) => {
  const [editedTaskId, setEditedTaskId] = useState(null);
  const dispatch = useDispatch();

  const handleEditTask = (task) => {
    setEditedTaskId(task.id);
  };

  const handleCloseEdit = () => {
    setEditedTaskId(null);
  };

  const handleUpdateTask = async (updatedTask) => {
    try {
      dispatch(updateTask(updatedTask));
      setEditedTaskId(null);
    } catch (error) {
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
    <div className="task-list">
      {tasks && tasks.length > 0 ? (
        <ul>
          {tasks.map((task) => (
            <li key={task.id}> 
              <Task
                task={task}
                onTaskEdit={handleEditTask}
                onTaskUpdate={handleUpdateTask}
                onTaskDelete={handleTaskDelete}
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
      ) : (
        <p>No tasks found for this category.</p>
      )}
    </div>
  );
};

export default TaskList;