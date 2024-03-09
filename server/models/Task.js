// models/task.js
const mongoose = require('mongoose');

// Define the schema for tasks
const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'low'
  },
  completion: {
    type: String,
    enum: ['todo', 'in progress', 'completed'],
    default: 'todo'
  },
  dueDate: {
    type: Date
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  }
});

// Create a Task model based on the schema
const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
