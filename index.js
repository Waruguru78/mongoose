require('dotenv').config();  // Load environment variables from .env
const mongoose = require('mongoose');
const Person = require('./Person'); // Import the Person model

// Connect to MongoDB using Mongoose
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Function to save a person
const savePerson = async () => {
  try {
    const person = new Person({
      name: 'John Doe',
      age: 30,
      favoriteFoods: ['Pizza', 'Burger'],
    });

    // Await the save operation
    const savedPerson = await person.save();
    console.log('Person saved successfully:', savedPerson);
  } catch (err) {
    console.error('Error saving the person:', err);
  }
};

savePerson(); // Call the async function

// Function to create multiple people
const createManyPeople = async () => {
    const people = [
      { name: 'Alice', age: 25, favoriteFoods: ['Apple', 'Banana'] },
      { name: 'Bob', age: 30, favoriteFoods: ['Bread', 'Cheese'] },
      { name: 'Charlie', age: 35, favoriteFoods: ['Chocolate', 'Chips'] }
    ];
  
    try {
      const createdPeople = await Person.create(people);
      console.log('People created successfully:', createdPeople);
    } catch (err) {
      console.error('Error creating people:', err);
    }
  };
  
  createManyPeople(); // Call the function to create multiple people

// Function to find people by name
const findPeopleByName = async (name) => {
    try {
      const people = await Person.find({ name: name });
      console.log('People found:', people);
    } catch (err) {
      console.error('Error finding people:', err);
    }
  };
  
  findPeopleByName('Alice'); // Call the function to find people named 'Alice'
  
// Function to find one person by favorite food
const findOnePersonByFood = async (food) => {
    try {
      const person = await Person.findOne({ favoriteFoods: food });
      console.log('Person found by food:', person);
    } catch (err) {
      console.error('Error finding person by food:', err);
    }
  };
  
  // Call the function to find a person who likes 'Chocolate'
  findOnePersonByFood('Chocolate');
  
// Function to find a person by _id
const findPersonById = async (personId) => {
    try {
      const person = await Person.findById(personId);
      console.log('Person found by ID:', person);
    } catch (err) {
      console.error('Error finding person by ID:', err);
    }
  };
  
  findPersonById('66e47de8b502591f549f08d5');
  
// Function to update a person's favorite foods
const updatePersonFavoriteFoods = async (personId) => {
    try {
      const person = await Person.findById(personId);
      if (person) {
        person.favoriteFoods.push('hamburger');
        await person.save(); // Save the updated person
        console.log('Person updated successfully:', person);
      } else {
        console.log('Person not found');
      }
    } catch (err) {
      console.error('Error updating person:', err);
    }
  };
  
  updatePersonFavoriteFoods('66e47de8b502591f549f08d5');
  
// Function to update a person's age by name
const updatePersonAgeByName = async (name) => {
    try {
      const updatedPerson = await Person.findOneAndUpdate(
        { name: name },
        { age: 20 },
        { new: true } // Return the updated document
      );
      console.log('Updated person:', updatedPerson);
    } catch (err) {
      console.error('Error updating person’s age:', err);
    }
  };
  
  // Call the function to update the age of 'Alice'
  updatePersonAgeByName('Alice');
  
// Function to delete a person by _id
const deletePersonById = async (personId) => {
    try {
      const deletedPerson = await Person.findByIdAndDelete(personId);
      console.log('Deleted person:', deletedPerson);
    } catch (err) {
      console.error('Error deleting person:', err);
    }
  };
  
  deletePersonById('66e47de8b502591f549f08d2');
  
// Function to delete people by name
const deleteManyPeopleByName = async (name) => {
    try {
      const result = await Person.deleteMany({ name: name });
      console.log('Delete result:', result);
    } catch (err) {
      console.error('Error deleting people:', err);
    }
  };
  
  // Call the function to delete people named 'Mary'
  deleteManyPeopleByName('Mary');
 
// Function to find people who like a specific food, sort, limit, and hide age
const findPeopleByFood = async (food) => {
    try {
      const people = await Person.find({ favoriteFoods: food })
        .sort({ name: 1 }) // Sort by name in ascending order
        .limit(2) // Limit the results to 2 documents
        .select('-age') // Exclude the age field
        .exec(); // Execute the query
  
      console.log('Found people:', people);
    } catch (err) {
      console.error('Error finding people by food:', err);
    }
  };
  
  // Call the function to find people who like 'burritos'
  findPeopleByFood('burritos');
  