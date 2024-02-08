const express = require('express');
const cors = require('cors');
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

app.get('/', (req, res) => {
    console.log("Hello world!");
    console.log(req.url);
    res.send('Hello world!');
});

app.post('/api/register', async (req, res) => {

  const email = req.body.email;
  const pass =  req.body.pass;
  const role = req.body.role;

    try {
        const newUser = new User({
          email: email,
          password: await bcrypt.hash(pass, 12),
          role: role,
        });
    
        const savedUser = await newUser.save();
        console.log('User saved:', savedUser);
    
        res.json({
          status: 'ok',
          email: email,
          password: pass,
          role: role,
        });
      } catch (error) {
        console.error('Error saving user:', error);
        res.status(500).json({ error: 'Server error' });
      }
    
})

app.post('/api/login', async (req, res) => {
  try {
      const loginEmail = req.body.email;
      const loginPass = req.body.password
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
