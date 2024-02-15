const mongoose = require('mongoose');

const petSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    age: {
      type: String,
      enum: [
        Young,
        Adolescent,
        Adult,
        Senior
      ],
      required: true
    },
    gender: {
      type: String,
      enum: [
        Male,
        Female
      ],
      required: true
    },
    species: {
      type: String,
      required: true
    },
    breed: {
      type: String,
      required: false
    },
    color: {
      type: String,
      required: false
    },
    size: {
      type: String,
      enum: [
        Munchkin,
        Small,
        Medium,
        Large,
        Giant
      ],
      required: true
    }
  }
)

const Pet = mongoose.model('Pet', petSchema);

module.exports = Pet