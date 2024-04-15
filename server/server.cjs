const express = require("express");
require("dotenv").config();
const cors = require("cors");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const app = express();
const port = 3001;
const http = require("http").createServer(app); // Create HTTP server
const io = require("socket.io")(http, {
  cors: {
    origin: `${process.env.CLIENT_URL}`,
    methods: ["GET", "POST"],
  },
});

const User = require("./Models/userSchema.js");
const Pet = require("./Models/petSchema.js");
const ShelterInfo = require("./Models/shelterInfoSchema.js");
const PawrentInfo = require("./Models/pawrentInfoSchema.js");
const { OAuth2Client } = require("google-auth-library");
const GoogleUser = require("./Models/googleUserSchema.js");
const QuestRes = require("./Models/questResSchema.js");
const PawrentNotif = require("./Models/pawrentNotif.js");
const Contact = require("./Models/contactSchema.js");
//db connection >>
mongoose
  .connect(process.env.DB_URI)
  .then(() => {
    console.log("Connected to db");
  })
  .catch((err) => {
    console.log("error:" + err.message);
  });

app.use(cors());
app.use(express.json()); // Parse JSON data from the request body
app.use(express.urlencoded({ extended: true }));

app.post("/verify", async (req, res) => {
  const token = req.query.token;
  try {
    const gUser = await GoogleUser.findOne({ verificationToken: token });
    const user = await User.findOne({ verificationToken: token });
    if (user) {
      role = req.body.role;
      user.verified = true;
      user.role = role;
      user.verificationToken = undefined;
      const updatedUser = await user.save();
      res.send(updatedUser);
    } else if (gUser) {
      role = req.body.role;
      gUser.role = role;
      gUser.verificationToken = undefined;
      const updatedUser = await gUser.save();
      res.send(updatedUser);
    } else {
      res.status(404).send({ message: "User not found" });
    }
  } catch (error) {
    console.log(error);
  }
});

app.get(`/verifyRole`, async (req, res) => {
  const token = req.query.token;

  try {
    const user = await User.findOne({ verificationToken: token });

    if (user) {
      user.verified = true;
      user.verificationToken = undefined;
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
        subject: "Email Verification from SaveAStray",
        html: `
          <p>Dear Client,</p><br>

          <p>Greetings! We're thrilled to have you join our platform. To ensure you have full access and tailored experience, we kindly ask you to verify your email and select your role.</p><br>

          <p>Verifying your email ensures the security of your account and unlocks all features. Click the link below to verify:</p><br>

          <p><a href="${process.env.CLIENT_URL}/verify?token=${verificationToken}" style="text-decoration: none; background-color: #FF8210; color: white; padding: 12px 25px; border-radius: 100px;"><strong>Verify Email</strong></a></p><br>

          <p>Once verified, you'll be prompted to choose your role - pawrent or rescue shelter. This selection optimizes your experience.</p><br>

          <p>Should you encounter any issues or have questions, please reach out to our support team at <a href="${process.env.USER_EMAIL}" style="color: #FF8210; text-decoration: none;">[saveastray.lyfie@gmail.com]</a>. Your cooperation is invaluable in creating a secure and efficient environment for all users.</p><br>

          <p>Thank you for your attention to this matter.</p><br>

          <p>Best regards,<br>
          SaveAStray</p>
        `,
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

app.post("/api/googleAccVerify", async (req, res) => {
  try {
    const token = req.body.cred;
    const client = new OAuth2Client(process.env.CLIENT_ID);
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.CLIENT_ID,
    });
    if (ticket) {
      res.send({
        status: 200,
        ticket,
        message: "Google Verification success!",
      });
    } else
      res.send({
        status: 400,
        messge: "Google Verification failed!",
      });
  } catch (error) {
    console.log(error);
  }
});

app.post("/api/googleSignup", async (req, res) => {
  //console.log(req.body.data.ticket);
  const payload = req.body.data.ticket.payload;
  console.log(payload);
  const email = payload.email;
  const email_verified = payload.email_verified;
  const firstName = payload.firstName;
  const surname = payload.surname;

  console.log(payload);

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
        subject: "Choose A Role",
        html: `
          <p>Dear Client,</p><br>

          <p>Greetings! We're thrilled to have you join our platform. To ensure you have full access and tailored experience, we kindly ask you to verify your email and select your role.</p><br>

          <p>Verifying your email ensures the security of your account and unlocks all features. Click the link below to verify:</p><br>

          <p><a href="${process.env.CLIENT_URL}/verify?token=${verificationToken}" style="text-decoration: none; background-color: #FF8210; color: white; padding: 12px 25px; border-radius: 100px;"><strong>Verify Email</strong></a></p><br>

          <p>Once verified, you'll be prompted to choose your role - pawrent or rescue shelter. This selection optimizes your experience.</p><br>

          <p>Should you encounter any issues or have questions, please reach out to our support team at <a href="${process.env.USER_EMAIL}" style="color: #FF8210; text-decoration: none;">[saveastray.lyfie@gmail.com]</a>. Your cooperation is invaluable in creating a secure and efficient environment for all users.</p><br>

          <p>Thank you for your attention to this matter.</p><br>

          <p>Best regards,<br>
          SaveAStray</p>
        `,
      });
      console.log("Verification email sent:", info);
    } catch (error) {
      console.error("Error sending verification email:", error);
      throw error; // Rethrow the error to be handled by the caller
    }
  }

  try {
    const existingUser = await User.findOne({ email });
    const existingGoogleUser = await GoogleUser.findOne({ email });

    if (existingUser || existingGoogleUser) {
      res.send({
        message: "Email is taken",
        status: 409,
      });
    } else {
      const verificationToken = generateVerificationToken();
      const newGoogleUser = new GoogleUser({
        email,
        verified: email_verified,
        role: null,
        firstName,
        surname,
        verificationToken,
      });
      const savedUser = await newGoogleUser.save();
      console.log(savedUser);

      await sendVerificationEmail(email, verificationToken);

      res.send({
        status: 200,
        message: "User Created!",
        user: {
          email,
          //role: null,
          verificationToken,
        },
      });
    }
  } catch (error) {
    console.error("Error verifying token:", error);
    res.status(401).json({ message: "Invalid Google Sign-In token" });
  }
});

app.post("/api/addAnimal", async (req, res) => {
  console.log(req.body);
  const {
    name,
    description,
    species,
    breed,
    sex,
    age,
    color,
    size,
    photos,
    shelter,
  } = req.body;

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
      shelter,
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
    const user = await User.findOne({
      email: loginEmail,
      role: loginRole,
    }).exec();

    if (!user) {
      console.log("User not found");
      return res.send({
        status: 400,
        checked: true,
        message: "User not found!",
      });
    } else {
      // Compare passwords using bcrypt.compare
      const match = await bcrypt.compare(loginPass, user.password);

      if (match) {
        // Passwords match, send success response
        res.send({
          status: 200,
          message: "Log in Success",
          checked: true,
          user: user._id,
          role: user.role,
        });
      } else {
        // Passwords don't match, send failure response
        res.send({
          status: 401,
          message: "Wrong Email/Pass",
          checked: true,
        });
      }
    }
  } catch (err) {
    // Handle server errors
    console.error(err);
    return res.status(500).send("Internal Server Error");
  }
});

app.post("/api/googleLogin", async (req, res) => {
  const token = req.body.cred;
  const client = new OAuth2Client(process.env.CLIENT_ID);
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const email = payload.email;

    console.log(payload);
    console.log(email);

    const userExists = await User.findOne({ email });
    const existingGoogleUser = await GoogleUser.findOne({ email });

    if (existingGoogleUser) {
      const user = existingGoogleUser._id;
      const role = existingGoogleUser.role;
      console.log("user ro;e: ", role);
      res.send({
        user,
        role,
        message: "User Logged in!",
        status: 200,
      });
    } else {
      res.send({
        message: "Not exists!",
        status: 400,
      });
    }
  } catch (error) {
    console.error("Error verifying token:", error);
    res.status(401).json({ message: "Invalid Google Sign-In token" });
  }
});

app.post("/api/sendAnswers", async (req, res) => {
  const data = req.body;
  const respondent = data.respondent;
  const section1 = data.section1;
  const section2 = data.section2;
  const section3 = data.section3;
  const section4 = data.section4;
  const section5 = data.section5;
  const section6 = data.section6;
  const toShelter = data.toShelter;
  const timestamp = Date.now();
  if (data) {
    try {
      const newQuestRes = new QuestRes({
        respondent,
        timestamp,
        answers: {
          section1,
          section2,
          section3,
          section4,
          section5,
          section6,
        },
        toShelter,
        approvalStatus: "pending",
      });
      const savedQuestRes = await newQuestRes.save();
      console.log(savedQuestRes);
      res.send({ status: 200, message: "Success!!" });
    } catch (error) {
      console.log(error);
    }
  } else {
    res.send({
      status: 400,
      message: "No response!",
    });
  }
});

app.get("/getPet/:user", async (req, res) => {
  console.log(req.params);

  try {
    const userId = req.params.user;

    // Look for user in User collection
    let user = await User.findOne({ _id: userId });

    // If user not found in User collection, try GoogleUser collection
    if (!user) {
      user = await GoogleUser.findOne({ _id: userId });
    }

    let userRole;
    if (user) {
      userRole = user.role; // Access role only if user is found
    }

    let gUserRole;
    if (gUserRole) {
      // Check for existence before accessing role
      gUserRole = await GoogleUser.findOne({ _id: userId });
      gUserRole = gUserRole.role; // Access role only if gUserRole is found
    }

    if (userRole === "Adoptive Pawrent" || gUserRole === "Adoptive Pawrent") {
      const allPets = await Pet.find();
      res.send({
        status: 200,
        allPets,
      });
    } else if (
      userRole === "Rescue Shelter" ||
      gUserRole === "Rescue Shelter"
    ) {
      const allPets = await Pet.find({ shelter: userId }); // Assuming 'shelter' field in Pet model
      res.send({
        status: 200,
        allPets,
      });
    } else {
      res.status(403).send({ error: "Unauthorized user role" }); // Handle unauthorized roles
    }
  } catch (err) {
    console.log("error: ", err);
    res.status(500).send({ error: "Internal server error" });
  }
});

/* app.get("/getPet", async (req, res) => {
  try {
    const allPets = await Pet.find();
    res.send({
      status: 200,
      allPets,
    });
  } catch (err) {
    console.log("error: ", err);
  }
}); */

app.post("/api/fetchRequests", async (req, res) => {
  const { user } = req.body;

  try {
    const allAnswers = await QuestRes.find({ toShelter: user });

    if (!allAnswers) {
      console.log("No answers found");
      return res
        .status(200)
        .send({ status: 200, respondent: null, allAnswers: [] }); // Send empty response
    }

    const mappedAnswers = await Promise.all(
      allAnswers.map(async (answer) => {
        const { respondent, timestamp, _id, approvalStatus, toShelter } =
          answer;
        const pawrentInfo = await PawrentInfo.find({ userId: respondent });

        if (!pawrentInfo || pawrentInfo.length === 0) {
          return {
            firstName: "A user",
          };
        }
        const mappedRespondentInfo = pawrentInfo.map((info) => ({
          firstName: info.firstName,
          timestamp: timestamp,
          id: _id,
          approvalStatus: approvalStatus,
          respondent: respondent,
          toShelter: toShelter,
          dp: info.dp,
        }));
        return {
          firstName: mappedRespondentInfo[0].firstName,
          timestamp: mappedRespondentInfo[0].timestamp,
          id: mappedRespondentInfo[0].id,
          approvalStatus: mappedRespondentInfo[0].approvalStatus,
          respondent: mappedRespondentInfo[0].respondent,
          toShelter: mappedRespondentInfo[0].toShelter,
          dp: mappedRespondentInfo[0].dp,
        };
      })
    );
    if (allAnswers[0] == undefined) {
      res.send({
        status: 200,
        respondent: null,
        allAnswers: null,
      });
    } else {
      const { respondent } = allAnswers[0]; // Assuming respondent is consistent across allAnswers
      console.log(mappedAnswers);
      res.send({
        status: 200,
        respondent,
        /*       timestamp,
      id,
      approvalStatus, */
        allAnswers: mappedAnswers,
      });
    }
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

app.post("/api/fetchNotifs", async (req, res) => {
  const { user } = req.body;

  try {
    const pawrentNotifs = await PawrentNotif.find({ to: user });
    if (!pawrentNotifs.length) {
      return res.send({
        status: 200,
        notifs: null,
      });
    }

    // Fetch shelter info for each notification in parallel (optional for performance)
    const shelterInfoPromises = pawrentNotifs.map((notif) =>
      ShelterInfo.find({ userId: notif.from })
    );
    const resolvedShelterInfo = await Promise.all(shelterInfoPromises);

    const mappedNotifs = pawrentNotifs.map((notif, index) => {
      const shelterData = resolvedShelterInfo[index]; // Get corresponding shelter info

      console.log("notif ", shelterData);
      return {
        to: notif.to,
        from: shelterData[0].shelterName,
        approvalStatus: notif.approvalStatus,
        timestamp: notif.timestamp,
        imageURL: shelterData[0].dp,
        //shelterInfo: shelterData ? shelterData[0] : null, // Include only the first document (assuming one shelter per user)
      };
    });

    console.log("mapped pawrent notifs ", mappedNotifs);
    res.send({
      status: 200,
      mappedNotifs,
    });
  } catch (err) {
    console.log(err);
    return res.send({
      status: 500,
      error: "Internal server error",
    });
  }
});

app.get("/getShelter", async (req, res) => {
  try {
    const allShelter = await User.find({ role: "Rescue Shelter" });
    res.send({
      status: 200,
      allShelter,
      message: "use allShelter._id to get ID",
    });
  } catch (err) {
    console.log("error: ", err);
  }
});

app.get("/api/filteredPets", async (req, res) => {
  try {
    const { species, sex, age, size, status } = req.query;
    let filter = {};

    if (species) filter.species = species;
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

// Shelter Info API
app.post("/api/updateShelterInfo", async (req, res) => {
  const userId = req.body.userId;
  const {
    shelterName,
    shelterAddress,
    cityAddress,
    zipCode,
    shelterEmailAddress,
    shelterPhoneNumber,
    animalAdoptionFeeForDogs,
    animalAdoptionFeeForCats,
    representativeFirstName,
    representativeLastName,
    representativeHomeAddress,
    representativeCityAddress,
    representativeZipCode,
    representativeBirthdate,
    representativePhoneNumber,
  } = req.body;

  try {
    let shelterInfo = await ShelterInfo.findOne({ userId });

    if (!shelterInfo) {
      shelterInfo = new ShelterInfo({
        userId,
        shelterName,
        shelterAddress,
        cityAddress,
        zipCode,
        shelterEmailAddress,
        shelterPhoneNumber,
        animalAdoptionFeeForDogs,
        animalAdoptionFeeForCats,
        representativeFirstName,
        representativeLastName,
        representativeHomeAddress,
        representativeCityAddress,
        representativeZipCode,
        representativeBirthdate,
        representativePhoneNumber,
      });
    } else {
      shelterInfo.shelterName = shelterName;
      shelterInfo.shelterAddress = shelterAddress;
      shelterInfo.cityAddress = cityAddress;
      shelterInfo.zipCode = zipCode;
      shelterInfo.shelterEmailAddress = shelterEmailAddress;
      shelterInfo.shelterPhoneNumber = shelterPhoneNumber;
      shelterInfo.animalAdoptionFeeForDogs = animalAdoptionFeeForDogs;
      shelterInfo.animalAdoptionFeeForCats = animalAdoptionFeeForCats;
      shelterInfo.representativeFirstName = representativeFirstName;
      shelterInfo.representativeLastName = representativeLastName;
      shelterInfo.representativeHomeAddress = representativeHomeAddress;
      shelterInfo.representativeCityAddress = representativeCityAddress;
      shelterInfo.representativeZipCode = representativeZipCode;
      shelterInfo.representativeBirthdate = representativeBirthdate;
      shelterInfo.representativePhoneNumber = representativePhoneNumber;
    }

    await shelterInfo.save();

    res
      .status(200)
      .json({ message: "Shelter information updated successfully" });
  } catch (error) {
    console.error("Error updating shelter info:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/updateApproval", async (req, res) => {
  const { requestId, approvalStatus } = req.body;
  const request = await QuestRes.findOne({ _id: requestId });
  if (request) {
    console.log(requestId, approvalStatus);
    console.log("request Approval in request : ", request.approvalStatus);
    try {
      request.approvalStatus = approvalStatus;
      const updatedRequest = await request.save();
      res.send({
        status: 200,
        updatedRequest,
      });
    } catch (error) {
      res.send({
        status: 400,
        message: "failed",
      });
      console.log(error);
    }
  } else {
    console.log("Approval failed!");
  }
});

//Fetch Shelter Info API
app.get("/api/shelterInfo/:userId", async (req, res) => {
  const { userId } = req.query;
  if (userId) {
    try {
      const shelterInfo = await ShelterInfo.findOne({ userId });

      console.log(shelterInfo);
      if (shelterInfo) {
        const user =
          (await GoogleUser.findById(userId)) || (await User.findById(userId));

        res.json({
          status: 200,
          shelterInfo,
          email: user.email,
        });
      } else {
        res.json({
          status: 400,
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    console.log("user not exists");
  }
});

app.post("/api/notifPawrent", async (req, res) => {
  const notif = req.body.response.data.updatedRequest;
  const { respondent, toShelter, approvalStatus, timestamp } = notif;
  console.log("req.body: ", respondent, toShelter, approvalStatus, timestamp);
  try {
    const newPawrentNotif = new PawrentNotif({
      to: respondent,
      from: toShelter,
      approvalStatus,
      timestamp,
    });
    const savedPawrentNotif = await newPawrentNotif.save();
    console.log(savedPawrentNotif);
  } catch (error) {
    console.log(error);
  }

  console.log("notif ", notif);
});

// Pawrent Info API
app.post("/api/updatePawrentInfo", async (req, res) => {
  const userId = req.body.userId;
  const {
    firstName,
    lastName,
    homeAddress,
    cityAddress,
    zipCode,
    birthdate,
    emailAddress,
    phoneNumber,
  } = req.body;

  try {
    let pawrentInfo = await PawrentInfo.findOne({ userId });

    if (!pawrentInfo) {
      pawrentInfo = new PawrentInfo({
        userId,
        firstName,
        lastName,
        homeAddress,
        cityAddress,
        zipCode,
        birthdate,
        emailAddress,
        phoneNumber,
      });
    } else {
      pawrentInfo.firstName = firstName;
      pawrentInfo.lastName = lastName;
      pawrentInfo.homeAddress = homeAddress;
      pawrentInfo.cityAddress = cityAddress;
      pawrentInfo.zipCode = zipCode;
      pawrentInfo.birthdate = birthdate;
      pawrentInfo.emailAddress = emailAddress;
      pawrentInfo.phoneNumber = phoneNumber;
    }

    await pawrentInfo.save();

    res
      .status(200)
      .json({ message: "Pawrent information updated successfully" });
  } catch (error) {
    console.error("Error updating pawrent info:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//Fetch Pawrent Info API
app.get("/api/pawrentInfo/:userId", async (req, res) => {
  const { userId } = req.query;

  if (userId) {
    try {
      const pawrentInfo = await PawrentInfo.findOne({ userId });
      console.log(pawrentInfo);
      if (pawrentInfo) {
        const user =
          (await GoogleUser.findById(userId)) || (await User.findById(userId));

        res.json({
          status: 200,
          pawrentInfo,
          email: user.email,
        });
      } else {
        res.json({
          status: 400,
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    console.log("user not exists");
  }
});

// API Delete Google User Credentials
app.delete("/api/deleteGoogleUserCredentials/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await GoogleUser.findOneAndDelete({ _id: id });
    res.sendStatus(200);
  } catch (error) {
    console.error("Error deleting user credentials:", error);
    res.status(500).send("Internal Server Error");
  }
});

// API Delete User Credentials
app.delete("/api/deleteUserCredentials/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await User.findOneAndDelete({ _id: id });
    res.sendStatus(200);
  } catch (error) {
    console.error("Error deleting user information:", error);
    res.status(500).send("Internal Server Error");
  }
});

// API Delete Shelter Info
app.delete("/api/deleteShelterInfo/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    await ShelterInfo.findOneAndDelete({ userId });
    res.sendStatus(200);
  } catch (error) {
    console.error("Error deleting shelter info:", error);
    res.status(500).send("Internal Server Error");
  }
});

// API Delete Pawrent Info
app.delete("/api/deletePawrentInfo/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    await PawrentInfo.findOneAndDelete({ userId });
    res.sendStatus(200);
  } catch (error) {
    console.error("Error deleting shepawrentlter info:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/api/updateDp", async (req, res) => {
  const { user, downloadURL } = req.body;
  console.log(req.body);
  if (req.body) {
    const pawrentDb = await PawrentInfo.findOne({ userId: user });
    const shelterDb = await ShelterInfo.findOne({ userId: user });
    if (pawrentDb) {
      pawrentDb.dp = downloadURL;
      const newPawrentDb = await pawrentDb.save();
      console.log(newPawrentDb);
    } else if (shelterDb) {
      shelterDb.dp = downloadURL;
      const newShelterDb = await shelterDb.save();
      console.log(newShelterDb);
    }
  } else {
    console.log("no req.body");
  }
});

app.get("/api/fetchContacts/:userId", async (req, res) => {
  const { userId } = req.params;
  let messages; // Define contact outside the if block

  if (userId) {
    messages = await Contact.find({ shelter: userId }); // Update the outer contact variable
    if (!messages || messages.length ===0) {
      messages = await Contact.find({ pawrent: userId }); 
    }
  }
  res.json({
    status:200,
    messages
  })
  
});



//socket
io.on("connection", (socket) => {
  const userId = socket.handshake.query.user;
  //console.log("Socket connected:", userId);

    socket.on("send-message", (messageInfo) => {
      const { timestamp, messageSender, content, chatId } = messageInfo
      console.log(messageInfo)
      io.emit("broadcast-message", `${messageSender} sent: ${content}`);
    });
});

// Start the server
http.listen(3001, () => {
  console.log("Server listening on port 3001");
});
