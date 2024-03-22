const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
          email: {
            type: String,
            unique: true, 
            required: true,
          },
          password: {
            type: String,
            required: true,
          },
          role: {
            type: String,
            default: null
          },
          verified: {
            type: Boolean,
            default: false,
            required: true
          },
          verificationToken: {
            type: String,
          },
          inquireTokens: {
            type: Number
          },
    }
)

const User = mongoose.model('User', userSchema);

module.exports = User
