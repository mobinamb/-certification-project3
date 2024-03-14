const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const personSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  categories: [{ type: Schema.Types.ObjectId, ref: 'Category' }] // Reference to baskets owned by the person
});

module.exports = mongoose.model('Person', personSchema);
