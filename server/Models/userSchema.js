const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
          },
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
            enum: ['Adoptive Parent', 'Adoption Center'], // Use an enumeration to define allowed roles
            default: 'Adoptive Parent', // Default role is set to 'user'
          },
    }
)

const User = mongoose.model('User', userSchema);

module.exports = User
