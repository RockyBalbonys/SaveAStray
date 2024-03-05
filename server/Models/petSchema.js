const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: String,
    enum: ['Young', 'Adolescent', 'Adult', 'Senior'],
    required: true
  },
  sex: {
    type: String,
    enum: ['Male', 'Female'],
    required: true
  },
  description: {
    type: String
  },
  species: {
    type: String,
    enum: ['Cat', 'Dog'],
    required: true
  },
  breed: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  size: {
    type: String,
    enum: ['Small', 'Medium', 'Large', 'Giant'],
    required: true
  },
  shelter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Shelter',
  },
  status: {
    type: String,
    enum: ['Available', 'In Process', 'Adopted'],
    default: 'Available',
    required: false
  },
  price: {
    type: Number,
    default: 0,
    required: true
  },
  photos: {
    type: Array
  }
});

const Pet = mongoose.model('Pet', petSchema);

module.exports = Pet;