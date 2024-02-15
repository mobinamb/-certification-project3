import React, { useState } from 'react';
import TaskEdit from './TaskEdit';
import TaskDelete from './TaskDelete';
import Task from './Task';

const TaskList = ({ tasks, onTaskDelete }) => {
  // State to manage currently edited task
  const [editedTasks, setEditedTasks] = useState({});

  const handleEditTask = (taskId) => {
    setEditedTasks((prevEditedTasks) => ({
      ...prevEditedTasks,
      [taskId]: true,
    }));
  };

  const handleCloseEdit = (taskId) => {
    setEditedTasks((prevEditedTasks) => ({
      ...prevEditedTasks,
      [taskId]: false,
    }));
  };

  // Function to handle task updates (replace with your logic)
  const handleTaskUpdate = async (updatedTask) => {
    try {
      // 1. Read existing tasks from JSON file
      const data = await readFile('./data/tasks.json');
      const tasks = JSON.parse(data);
  
      // 2. Find the task to update
      const index = tasks.findIndex((task) => task.id === updatedTask.id);
  
      // 3. Update the task in the tasks array
      tasks[index] = updatedTask;
  
      // 4. Write the updated tasks back to the JSON file
      await writeFile('./data/tasks.json', JSON.stringify(tasks));
  
      // 5. Update the tasks state in your component
      setTasks(tasks);
      setEditedTaskId(null); // Close edit form
  
      // Optionally, display a success message to the user
    } catch (error) {
      // Handle errors (e.g., display error message, log error)
      console.error('Error updating task:', error);
      // You can also display a user-friendly error message here
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
          />
          {editedTasks[task.id] && (
            <TaskEdit
              task={task}
              onTaskUpdate={handleTaskUpdate}
              onClose={() => handleCloseEdit(task.id)}
            />
          )}
          <TaskDelete taskId={task.id} onTaskDelete={onTaskDelete} />
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
