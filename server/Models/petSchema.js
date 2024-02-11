const mongoose = require('mongoose');

const petSchema = new mongoose.Schema(
  {
    "name": {
      "type": "string",
      "required": true
    },
    "age": {
      "type": "string",
      "enum": [
        "Baby",
        "Adolescent",
        "Adult",
        "Senior"
      ],
      "required": true
    },
    "gender": {
      "type": "string",
      "enum": [
        "Male",
        "Female",
        "Unknown"
      ],
      "required": true
    },
    "specie": {
      "type": "string",
      "required": true
    },
    "breed": {
      "type": "string",
      "required": true
    },
    "color": {
      "type": "string",
      "required": false
    },
    "size": {
      "type": "string",
      "enum": [
        "Small",
        "Medium",
        "Large",
        "Giant"
      ],
      "required": true
    }
  }
)

const Pet = mongoose.model('Pet', petSchema);

module.exports = Pet