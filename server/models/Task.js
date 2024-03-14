const mongoose = require('mongoose');

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

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
