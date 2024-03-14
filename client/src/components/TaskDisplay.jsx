import React from 'react';

const filterTasks = (tasks, selectedFilters) => {
    return tasks.filter((task) => {
      const priorityMatches = !selectedFilters.priority || task.priority === selectedFilters.priority;
      const statusMatches = !selectedFilters.completion || task.completion === selectedFilters.completion;
      const isTodaysTask = !selectedFilters.todayOnly || isToday(task.dueDate);
  
      return priorityMatches && statusMatches && isTodaysTask;
    });
  };


  const isToday = (dueDate) => {
    const today = new Date();
    const taskDate = new Date(dueDate);
  
    const userTimeZoneOffset = today.getTimezoneOffset() / 60;
    taskDate.setHours(taskDate.getHours() + userTimeZoneOffset);
  
    return today.toLocaleDateString() === taskDate.toLocaleDateString();
  };
  
const TaskDisplay = ({ tasks, filters }) => {
  const filteredTasks = filterTasks(tasks, filters);
  return (
    <div>
      {/* Render filtered tasks */}
      {filteredTasks.map((task) => (
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
