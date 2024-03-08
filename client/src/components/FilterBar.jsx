import React, { useState } from 'react';

const FilterBar = ({ onFilterChange }) => {
  const [selectedPriority, setSelectedPriority] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedDateOption, setSelectedDateOption] = useState('all'); // Initialize with 'all' as default

  const handlePriorityChange = (event) => {
    setSelectedPriority(event.target.value);
    onFilterChange({ priority: event.target.value }); // Pass selection to parent
  };

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
    onFilterChange({ completion: event.target.value }); // Pass selection to parent
  };

  const handleDateOptionChange = (event) => {
    setSelectedDateOption(event.target.value);
    const todayOnly = event.target.value === 'today' ? true : false;
    onFilterChange({ todayOnly });
  };

  return (
    <div>
      <select value={selectedPriority} onChange={handlePriorityChange}>
        <option value="">All Priorities</option>
        <option value="low">low</option>
        <option value="medium">medium</option>
        <option value="high">high</option>
      </select>
      <select value={selectedStatus} onChange={handleStatusChange}>
        <option value="">All Statuses</option>
        <option value="todo">todo</option>
        <option value="in progress">in progress</option>
        <option value="completed">completed</option>
      </select>
      <select value={selectedDateOption} onChange={handleDateOptionChange}>
        <option value="all">All Tasks</option>
        <option value="today">Today's Tasks</option>
      </select>
    </div>
  );
};

export default FilterBar;
