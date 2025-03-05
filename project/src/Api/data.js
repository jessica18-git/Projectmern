const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();

// Enable CORS with specific options
const corsOptions = {
  origin: 'http://localhost:3000', // Allow only the frontend at localhost:3000
  methods: ['GET', 'POST'], // Allow specific HTTP methods
  allowedHeaders: ['Content-Type'], // Allow specific headers
};
app.use(cors(corsOptions)); // Apply CORS configuration

// Middleware to parse incoming JSON request bodies
app.use(express.json());

// POST route to handle registration
app.post('/api/register', (req, res) => {
  const registrationData = req.body;

  // Path to data.json
  const dataFilePath = path.join(__dirname, 'data.json');

  // Read existing registrations from data.json
  fs.readFile(dataFilePath, (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to read data file.' });
    }

    let registrations = [];
    if (data.length > 0) {
      registrations = JSON.parse(data); // Parse existing registration data
    }

    // Add new registration to the array
    registrations.push(registrationData);

    // Save updated registrations back to data.json
    fs.writeFile(dataFilePath, JSON.stringify(registrations, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ message: 'Failed to save registration.' });
      }

      // Send a success response
      res.status(200).json({ message: 'Registration successful!' });
    });
  });
});


// Login Route
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  fs.readFile(dataFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading data file:', err);
      return res.status(500).send('Error reading data file');
    }

    const registrations = data ? JSON.parse(data) : [];
    const user = registrations.find(user => user.email === email && user.password === password);

    if (user) {
      res.status(200).json({ message: "You're now logged in!" });
    } else {
      res.status(401).json({ message: 'Invalid user' });
    }
  });
});




// Start the server
app.listen(3001, () => {
  console.log('Backend is running on http://localhost:3001');
});
