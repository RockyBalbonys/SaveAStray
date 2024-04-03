const mongoose = require('mongoose');

const pawrentInfoSchema = new mongoose.Schema({
  userId: String,
  firstName: String,
  lastName: String,
  homeAddress: String,
  cityAddress: String,
  zipCode: String,
  emailAddress: String,
  phoneNumber: String,
  dp: String
});

const PawrentInfo = mongoose.model('PawrentInfo', pawrentInfoSchema);

module.exports = PawrentInfo;