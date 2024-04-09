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
  dp: {
    type: String,
    default: "https://firebasestorage.googleapis.com/v0/b/save-a-stray-40e56.appspot.com/o/user%2Fdp%2FSAS_Logo4.png?alt=media&token=9136fc81-99ba-428f-b1fc-de7182db59d0"
  }
});

const ShelterInfo = mongoose.model('ShelterInfo', shelterInfoSchema);

module.exports = ShelterInfo;