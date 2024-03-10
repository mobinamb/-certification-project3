const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Person = require('../models/Person');
const Basket = require('../models/Category');
const Task = require('../models/Task');

// GET all people
router.get('/', async (req, res) => {
  try {
    const people = await Person.find();
    res.json(people);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a specific person
router.get('/:id', async (req, res) => {
  try {
    const person = await Person.findById(req.params.id);
    if (person == null) {
      return res.status(404).json({ message: 'Person not found' });
    }
    res.json(person);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new person
router.post('/', async (req, res) => {
  const { username, password } = req.body;
  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the saltRounds

    // Create a new Person instance with hashed password
    const person = new Person({
      username,
      password: hashedPassword // Store the hashed password in the database
    });

    // Save the person to the database
    const savedPerson = await person.save();
    res.status(201).json(savedPerson);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a specific person
router.delete('/:id', async (req, res) => {
  try {
    const personId = req.params.id;
    // Find the person
    const person = await Person.findById(personId);
    if (!person) {
      return res.status(404).json({ message: 'Person not found' });
    }
    // Get all baskets owned by the person
    const baskets = await Basket.find({ owner: personId });
    // Loop through each basket to delete associated tasks
    for (const basket of baskets) {
      // Delete tasks associated with the basket
      await Task.deleteMany({ basket: basket._id });
    }
    // Delete all baskets owned by the person
    await Basket.deleteMany({ owner: personId });
    // Delete the person
    await Person.findByIdAndDelete(personId);
    res.json({ message: 'Deleted person and associated baskets/tasks' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
