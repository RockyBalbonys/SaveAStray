const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const port = 3001;
const uri = 'mongodb+srv://Lyfie:pass123@dbsas.mtpeotb.mongodb.net/SAS_DB';
const User = require('./Models/userSchema.js');

//db connection >>
mongoose.connect(uri)
    .then(() => {
        console.log("Connected to db");
    }).catch(() => {
        console.log("error");
    });

app.use(cors());
app.use(express.json()); // Parse JSON data from the request body

app.get('/', (req, res) => {
    console.log("Hello world!");
    console.log(req.url);
    res.send('Hello world!');
});

app.post('/api/register', async (req, res) => {
    try {
        const newUser = new User({
          email: req.body.email,
          password: req.body.password,
          role: req.body.role,
        });
    
        const savedUser = await newUser.save();
        console.log('User saved:', savedUser);
    
        res.json({
          status: 'ok',
          email: req.body.email,
          password: req.body.password,
          role: req.body.role,
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
      console.log(req.body);

      const user = await User.findOne({ email: loginEmail }).exec();

      if (!user) {
          console.log('User not found');
          return res.status(404).send('User not found');
      } else {
        if (user.password  === loginPass) {
          console.log('Found user:', user);
          res.send('Login successful');
        }}
  } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
  }
});



app.listen(port, () => {
    console.log("Connected to PORT ", port);
});
