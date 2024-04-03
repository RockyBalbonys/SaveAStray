const mongoose = require('mongoose');

const shelterInfoSchema = new mongoose.Schema({
  userId: String,
  shelterName: String,
  shelterAddress: String,
  cityAddress: String,
  zipCode: String,
  shelterEmailAddress: String,
  shelterPhoneNumber: String,
  animalAdoptionFeeForDogs: String,
  animalAdoptionFeeForCats: String,
  representativeFirstName: String,
  representativeLastName: String,
  representativeHomeAddress: String,
  representativeCityAddress: String,
  representativeZipCode: String,
  representativeBirthdate: Date,
  representativePhoneNumber: String,
  dp: String
});

const ShelterInfo = mongoose.model('ShelterInfo', shelterInfoSchema);

module.exports = ShelterInfo;