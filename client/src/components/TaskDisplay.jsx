\import React from 'react';

const isToday = (dueDate) => {
    const today = new Date();
    const taskDate = new Date(dueDate);
  
    const userTimeZoneOffset = today.getTimezoneOffset() / 60;
    taskDate.setHours(taskDate.getHours() + userTimeZoneOffset);
  
    return today.toLocaleDateString() === taskDate.toLocaleDateString();
};
  
const TaskDisplay = ({ tasks }) => {
    return (
    <div>
      {/* Render tasks */}
      {tasks.map((task) => (
        <div key={task.id}>
          {/* Render task details */}
          <p>Title: {task.title}</p>
          <p>Priority: {task.priority}</p>
          <p>Completion: {task.completion}</p>
          <p>Due Date: {task.dueDate}</p>
        </div>
      ))}
    </div>
  );
};

export default TaskDisplay;
