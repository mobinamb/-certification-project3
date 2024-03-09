const express = require('express');
const router = express.Router();
const Category = require('../models/Category');
const Person = require('../models/Person');

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
router.post('/:personId', async (req, res) => {
  const { name } = req.body;
  const personId = req.params.personId;
  try {
    // Check if the person exists
    const person = await Person.findById(personId);
    if (!person) {
      return res.status(404).json({ message: 'Person not found' });
    }
    const basket = new Category({
      name: name,
      owner: personId
    });
    const savedBasket = await basket.save();
    // Add the new basket to the person's baskets
    person.baskets.push(savedBasket._id);
    await person.save();
    res.status(201).json(savedBasket);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a specific basket (category)
router.delete('/:basketId/:personId', async (req, res) => {
  const basketId = req.params.basketId;
  const personId = req.params.personId;
  try {
    // Find the basket
    const basket = await Category.findById(basketId);
    if (!basket) {
      return res.status(404).json({ message: 'Basket not found' });
    }
    // Find the person
    const person = await Person.findById(personId);
    if (!person) {
      return res.status(404).json({ message: 'Person not found' });
    }
    // Remove the basket from the person's baskets
    person.baskets.pull(basketId);
    await person.save();
    // Delete the basket
    await Category.findByIdAndDelete(basketId);
    res.json({ message: 'Deleted basket' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
