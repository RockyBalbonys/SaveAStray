const mongoose = require("mongoose");

const pawrentInfoSchema = new mongoose.Schema({
  userId: String,
  firstName: String,
  lastName: String,
  homeAddress: String,
  cityAddress: String,
  zipCode: String,
  birthdate: String,
  emailAddress: String,
  phoneNumber: String,
  dp: {
    type: String,
    default:
      "https://firebasestorage.googleapis.com/v0/b/save-a-stray-40e56.appspot.com/o/user%2Fdp%2FSAS_Logo4.png?alt=media&token=9136fc81-99ba-428f-b1fc-de7182db59d0",
  },
});

const PawrentInfo = mongoose.model("PawrentInfo", pawrentInfoSchema);

module.exports = PawrentInfo;
