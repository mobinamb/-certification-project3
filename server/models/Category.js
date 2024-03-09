// models/category.js
const mongoose = require('mongoose');

// Define the schema for categories (baskets)
const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  tasks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task'
  }]
});

// Create a Category model based on the schema
const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
