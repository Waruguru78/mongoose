const mongoose = require('mongoose');

// Define a schema for Person
const personSchema = new mongoose.Schema({
  name: { type: String, required: true },  // Name is required
  age: Number,                             // Age is optional
  favoriteFoods: [String],                 // Array of strings for favorite foods
});

// Create a model based on the schema
const Person = mongoose.model('Person', personSchema);

module.exports = Person;
