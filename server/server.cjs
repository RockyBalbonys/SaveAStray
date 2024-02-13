const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const app = express();
const port = 3001;
const uri = 'mongodb+srv://Lyfie:pass123@dbsas.mtpeotb.mongodb.net/SAS_DB';
const User = require('./Models/userSchema.js');
require('dotenv').config();

//db connection >>
mongoose.connect(uri)
    .then(() => {
        console.log("Connected to db");
    }).catch((err) => {
        console.log("error:" + err.message);
    });

app.use(cors());
app.use(express.json()); // Parse JSON data from the request body

app.get(`/verify`, async (req, res) => {
  const token = req.query.token
  
  try {
    const user = await User.findOne({ verificationToken: token })

    if (user) {
      user.verified = true
      const updatedUser = await user.save();
      res.send(updatedUser)
    } else {
      res.status(404).send({ message: 'User not found' });
    }
    
  } catch (err) {
    console.log(err);
  }



});

app.post('/api/register', async (req, res) => {
  
  function generateVerificationToken() {
    return crypto.randomBytes(16).toString('hex');
  }
 
  async function sendVerificationEmail(email, verificationToken) {
    try {
      // Create a Nodemailer transporter using SMTP
      let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.USER_EMAIL,
          pass: process.env.USER_PASSWORD
        }
      });
  
      // Send verification email
      let info = await transporter.sendMail({
        from: process.env.USER_EMAIL,
        to: email,
        subject: 'Email Verification',
        text: `Please click the following link to verify your email: http://localhost:3000/verify?token=${verificationToken}`
      });
  
      console.log('Verification email sent:', info);
    } catch (error) {
      console.error('Error sending verification email:', error);
      throw error; // Rethrow the error to be handled by the caller
    }
  }

  const { email, pass, role } = req.body;
    try {
        const verificationToken = generateVerificationToken()
        const newUser = new User({
          email: email,
          password: await bcrypt.hash(pass, 12),
          role: role,
          verificationToken: verificationToken
        });
    
        const savedUser = await newUser.save();
        console.log('User saved:', savedUser);
        
        await sendVerificationEmail(email, verificationToken);
        
        res.json({
          status: 'ok',
          email: email,
          password: pass,
          role: role,
          verificationToken: verificationToken
        });
      } catch (error) {
        console.error('Error saving user:', error);
        res.status(500).json({ error: 'Server error' });
      }
    
})



app.post('/api/login', async (req, res) => {
  console.log(req.url);
  console.log(req.body);
  try {
    const loginEmail = req.body.email;
    const loginPass = req.body.password;
    const user = await User.findOne({ email: loginEmail }).exec();
    if (!user) {
      console.log('User not found');
      return res.status(404).json({ status: 404, message: "User not found!" });
    }

    // Compare passwords using bcrypt.compare
    const match = await bcrypt.compare(loginPass, user.password);

    if (match) {
      // Passwords match, send success response
      return res.status(200).send("Log in successful!");
    } else {
      // Passwords don't match, send error response
      return res.status(401).send("Wrong password!");
    }
  } catch (err) {
    console.error(err);
    return res.status(500).send('Internal Server Error');
  }
});



app.listen(port, () => {
    console.log("Connected to PORT ", port);
});
