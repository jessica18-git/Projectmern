const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt"); // Add bcrypt for password hashing

const app = express();
const port = 5000;

app.use(express.json());

const fileSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: String,        // You may want to include the email field in your schema
  phonenumber: String,  // Same for phone number
});

const Data = mongoose.model('userdata', fileSchema, 'userinfo');

mongoose.connect('mongodb://localhost:27017/logininfo', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => { console.log('Database connected successfully') })
  .catch((err) => { console.log(err); });

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Find the user by username
  const user = await Data.findOne({ username: username });

  if (user) {
    // Compare the provided password with the stored hash
    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      res.status(200).send("Login successful");
    } else {
      res.status(400).send("Invalid username or password");
    }
  } else {
    res.status(400).send("Invalid username or password");
  }
});

app.post('/register', async (req, res) => {
  const { username, password, email, phonenumber } = req.body;

  if (!username || !password) {
    return res.status(400).send("Username and password are required");
  }

  try {
    // Check if the user already exists
    const existingUser = await Data.findOne({ username });
    if (existingUser) {
      return res.status(400).send("Username is already taken");
    }

    // Hash the password before saving (for security)
    const hashedPassword = await bcrypt.hash(password, 10);

    const newData = new Data({
      username: username,
      email: email,
      phonenumber: phonenumber,
      password: hashedPassword, // Save the hashed password
    });

    await newData.save();
    res.status(201).send("Registration successful");
  } catch (err) {
    res.status(500).send("Server error: " + err.message);
  }
});

app.listen(port, () => {
  console.log(`App running at http://localhost:${port}`);
});