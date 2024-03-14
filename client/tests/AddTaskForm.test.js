import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AddTaskForm from '../src/components/AddTaskForm';

describe('AddTaskForm component', () => {
  it('should render the form with title, priority, completion, and due date input fields', () => {
    render(<AddTaskForm onTaskAdd={() => {}} />);

    const titleInput = screen.getByPlaceholderText('Task Title');
    const prioritySelect = screen.getByLabelText('Priority:');
    const completionSelect = screen.getByLabelText('Completion:');
    const dueDateInput = screen.getByPlaceholderText('Due Date');

    expect(titleInput).toBeInTheDocument();
    expect(prioritySelect).toBeInTheDocument();
    expect(completionSelect).toBeInTheDocument();
    expect(dueDateInput).toBeInTheDocument();
  });
});