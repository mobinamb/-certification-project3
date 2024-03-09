const express = require('express');
const router = express.Router();
const Category = require('../models/Category');
const Task = require('../models/Task');

// GET all baskets (categories)
router.get('/', async (req, res) => {
  try {
    const baskets = await Category.find();
    res.json(baskets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a specific basket (category)
router.get('/:id', async (req, res) => {
  try {
    const basket = await Category.findById(req.params.id).populate('tasks');
    if (basket == null) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.json(basket);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new basket (category)
router.post('/', async (req, res) => {
  const basket = new Category({
    name: req.body.name
  });

  try {
    const savedBasket = await basket.save();
    res.status(201).json(savedBasket);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a specific basket (category)
router.delete('/:id', async (req, res) => {
  try {
    const basket = await Category.findById(req.params.id);
    if (basket == null) {
      return res.status(404).json({ message: 'Category not found' });
    }
    await Task.deleteMany({ category: basket._id });
    await basket.deleteOne(); // Use deleteOne() method to remove the document
    res.json({ message: 'Deleted category' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;
