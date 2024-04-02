const mongoose = require('mongoose');

const googleUserSchema = new mongoose.Schema(
    {
          email: {
            type: String,
            unique: true, 
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
          firstName: {
            type: String
          },
          surname: {
            type: String
          },
          verificationToken: {
            type: String,
          },
          dp: {
            type: String
          }
    }
)

const GoogleUser = mongoose.model('GoogleUser', googleUserSchema);

module.exports = GoogleUser
