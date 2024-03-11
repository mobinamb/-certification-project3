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
      dispatch(deleteTask(taskId));
      // No need to update tasks state here
    } catch (error) {
      console.error('Error deleting task:', error);
      alert('Failed to delete task. Please try again.');
    }
  };

  return (
    <ul className="task-list">
      {/* Check if tasks array exists and is not empty before mapping */}
      {tasks && tasks.length > 0 && tasks.map((task) => (
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
              onClose={handleCloseEdit} // Pass function directly
            />
          )}
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
