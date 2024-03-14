const express = require('express');
const router = express.Router();
const Category = require('../models/Category');
const Person = require('../models/Person');

// GET all categories under a specific person
router.get('/:personId', async (req, res) => {
  try {
    const { personId } = req.params;
    const categories = await Category.find({ person: personId });
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a specific category under a specific person
router.get('/:personId/:categoryId', async (req, res) => {
  try {
    const { personId, categoryId } = req.params;
    const category = await Category.findOne({ _id: categoryId, person: personId });
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.json(category);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new category under a specific person
// POST a new category under a specific person
router.post('/:personId', async (req, res) => {
  const { name } = req.body;
  const { personId } = req.params; // Retrieve personId from the URL params
  try {
    // Check if the person exists
    const person = await Person.findById(personId);
    if (!person) {
      return res.status(404).json({ message: 'Person not found' });
    }
    const category = new Category({
      name: name,
      person: personId // Assign the person ID to the category
    });
    const savedCategory = await category.save();

    // Update the person's categories array
    person.categories.push(savedCategory._id);
    await person.save();

    res.status(201).json(savedCategory);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


// DELETE a specific category under a specific person
router.delete('/:personId/:categoryId', async (req, res) => {
  const { personId, categoryId } = req.params;
  try {
    // Find the category
    const category = await Category.findOne({ _id: categoryId, person: personId });
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    // Remove the category from the person's categories
    const person = await Person.findById(personId);
    if (!person) {
      return res.status(404).json({ message: 'Person not found' });
    }
    person.categories.pull(categoryId);
    await person.save();
    // Delete the category
    await Category.findByIdAndDelete(categoryId);
    res.json({ message: 'Deleted category' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
