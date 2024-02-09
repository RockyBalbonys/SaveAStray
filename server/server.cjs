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

//db connection >>
mongoose.connect(uri)
    .then(() => {
        console.log("Connected to db");
    }).catch((err) => {
        console.log("error:" + err.message);
    });

app.use(cors());
app.use(express.json()); // Parse JSON data from the request body

// functions:

app.post('/api/register', async (req, res) => {
  
  function generateVerificationToken() {
    return crypto.randomBytes(16).toString('hex');
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
  try {
      const { loginEmail, loginPass } = req.body;
      const user = await User.findOne({ email: loginEmail }).exec();
      
      if (!user) {
          console.log('User not found');
          res.status(404).json({ status: 404, message: "User not found!" });
      } else {
        bcrypt.compare(loginPass, user.password, (err, data) => {
          if (err) {
            console.log(err);
            res.send(err)
          }
          if (data) {
            res.status(200).send("Log in successful!")
          } else {
            res.send("wrong pass!");
          }
        })
    
      }
  } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
  }
});



app.listen(port, () => {
    console.log("Connected to PORT ", port);
});
