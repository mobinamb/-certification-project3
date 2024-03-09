const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const Category = require('../models/Category');

// GET all tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a specific task
router.get('/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (task == null) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new task
router.post('/:categoryId', async (req, res) => {
  const { categoryId } = req.params;

  try {
    // Check if the category exists
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    // Create a new task
    const task = new Task({
      title: req.body.title,
      priority: req.body.priority,
      completion: req.body.completion,
      dueDate: req.body.dueDate,
      category: categoryId
    });

    // Save the task
    const savedTask = await task.save();

    // Update the category's tasks array
    category.tasks.push(savedTask._id);
    await category.save();

    res.status(201).json(savedTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a specific task
router.delete('/:categoryId/:taskId', async (req, res) => {
  const { categoryId, taskId } = req.params;

  try {
    // Check if the category exists
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    // Check if the task exists
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Remove the task from the category's tasks array
    category.tasks.pull(task._id);
    await category.save();

    // Remove the task from the database
    await Task.findByIdAndDelete(taskId);

    res.json({ message: 'Deleted task' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
