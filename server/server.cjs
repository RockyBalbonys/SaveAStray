require("dotenv").config();
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const app = express();
const port = 3001;
const uri = `mongodb+srv://Lyfie:pass123@dbsas.mtpeotb.mongodb.net/SAS_DB`;
const User = require("./Models/userSchema.js");
const Pet = require("./Models/petSchema.js");

//db connection >>
mongoose
  .connect(uri)
  .then(() => {
    console.log("Connected to db");
  })
  .catch((err) => {
    console.log("error:" + err.message);
  });

app.use(cors());
app.use(express.json()); // Parse JSON data from the request body
app.use(express.urlencoded({ extended: true }));

app.get(`/verify`, async (req, res) => {
  const token = req.query.token;

  try {
    const user = await User.findOne({ verificationToken: token });

    if (user) {
      user.verified = true;
      const updatedUser = await user.save();
      res.send(updatedUser);
    } else {
      res.status(404).send({ message: "User not found" });
    }
  } catch (err) {
    console.log(err);
  }
});

app.post('/verify', async(req,res) => {
  const token = req.query.token;
  try {
    const user = await User.findOne({ verificationToken: token });
    if (user) {
      role = req.body.role
      user.role = role;
      const updatedUser = await user.save();
      res.send(updatedUser);
    } else {
      res.status(404).send({ message: "User not found" });
    }
  } catch (error) {
    console.log(error);
  }
})


app.get(`/verifyRole`, async (req, res) => {
  const token = req.query.token;

  try {
    const user = await User.findOne({ verificationToken: token });

    if (user) {
      user.verified = true;
      const updatedUser = await user.save();
      res.send(updatedUser);
    } else {
      res.status(404).send({ message: "User not found" });
    }
  } catch (err) {
    console.log(err);
  }
});



app.post("/api/register", async (req, res) => {
  function generateVerificationToken() {
    return crypto.randomBytes(16).toString("hex");
  }

  async function sendVerificationEmail(email, verificationToken) {
    try {
      // Create a Nodemailer transporter using SMTP
      let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.USER_EMAIL,
          pass: process.env.USER_PASSWORD,
        },
      });

      // Send verification email
      let info = await transporter.sendMail({
        from: process.env.USER_EMAIL,
        to: email,
        subject: "Email Verification",
        text: `Please click the following link to verify your email: http://localhost:3000/verify?token=${verificationToken}`,
      });

      console.log("Verification email sent:", info);
    } catch (error) {
      console.error("Error sending verification email:", error);
      throw error; // Rethrow the error to be handled by the caller
    }
  }

  const { email, pass, role } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      res.send({
        message: "User already exists",
        status: 409,
      });
    } else {
      const verificationToken = generateVerificationToken();
      const hashedPassword = await bcrypt.hash(pass, 12);

      const newUser = new User({
        email,
        password: hashedPassword,
        role,
        verificationToken,
      });

      const savedUser = await newUser.save();

      await sendVerificationEmail(email, verificationToken);

      res.send({
        status: 201,
        message: "User Created!",
        user: {
          email,
          role,
          verificationToken,
        },
      });
    }
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/api/addAnimal", async (req, res) => {
  console.log(req.body);
  const { name, description, species, breed, sex, age, color, size, photos } =
    req.body;

  try {
    const newPet = new Pet({
      name,
      description,
      species,
      breed,
      sex,
      age,
      color,
      size,
      status: "Available",
      photos,
    });
    const savedPet = await newPet.save();
    //const petId  = savedPet._id
    if (savedPet) {
      res.send({
        status: 200,
        message: "Ped added successfully",
        //petId
      });
      console.log("pet added: " + savedPet);
    }
  } catch (err) {
    console.log(err);
  }
});

app.post("/api/updatePet", async (req, res) => {
  console.log(req.body);

  const {
    _id,
    name,
    description,
    species,
    breed,
    sex,
    age,
    color,
    size,
    price,
    status,
  } = req.body;
  try {
    const pet = await Pet.updateOne(
      { _id },
      {
        $set: {
          name,
          description,
          species,
          breed,
          sex,
          age,
          color,
          size,
          price,
          status,
        },
      }
    );
    res.send({
      status: 200,
      message: "success",
    });
  } catch (err) {
    console.log(err);
  }
});

app.post("/api/login", async (req, res) => {
  console.log(req.body);
  try {
      const loginEmail = req.body.email;
      const loginPass = req.body.password;
      const loginRole = req.body.role;
      
      // Find user by email and role
      const user = await User.findOne({ email: loginEmail, role: loginRole }).exec();

      // If user is not found, return a 404 response
      if (!user) {
          console.log("User not found");
          return res.status(401 ).send({ status: 401 , message: "User not found!" });
      }

      // Compare passwords using bcrypt.compare
      const match = await bcrypt.compare(loginPass, user.password);

      if (match) {
          // Passwords match, send success response
          res.send({
              status: 200,
              message: "Log in Success",
              checked: true,
              user: user._id
          });
      } else {
          // Passwords don't match, send failure response
          res.send({
              status: 400,
              message: "Wrong Email/Pass",
              checked: true,
          });
      }
  } catch (err) {
      // Handle server errors
      console.error(err);
      return res.status(500).send("Internal Server Error");
  }
});


app.get("/getPet", async (req, res) => {
  try {
    const allPets = await Pet.find();
    res.send({
      status: 200,
      allPets,
    });
  } catch (err) {
    console.log("error: ", err);
  }
});

app.get("/api/filteredPets", async (req, res) => {
  try {
    const { species, sex, age, size, status } = req.query;
    let filter = {};

    if (species) filter.type = species;
    if (sex) filter.sex = sex;
    if (age) filter.age = age;
    if (size) filter.size = size;
    if (status) filter.status = status;

    const filteredPets = await Pet.find(filter);

    res.status(200).json({ filteredPets });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log("Connected to PORT ", port);
});
