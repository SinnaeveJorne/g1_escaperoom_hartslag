const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../config/db'); // Import the database connection
const router = express.Router();
const path = require('path');

router.post('/register', async (req, res) => {
  const { surname, name, email, password } = req.body;

  // Validate required fields
  if (!surname || !name || !email || !password) {
    return res.status(400).json({ message: 'Missing parameters' });
  }

  try {
    // Check if the user already exists
    const userExistsQuery = 'SELECT id FROM user WHERE email = ?';
    const userExists = await db.query(userExistsQuery, [email]);

    if (userExists.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new user into the database
    const insertUserQuery = `
      INSERT INTO user (firstname, lastname, email, hashed_password)
      VALUES (?, ?, ?, ?)
    `;
    await db.query(insertUserQuery, [surname, name, email, hashedPassword]);

    return res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    return res.status(500).json({ message: 'An error occurred. Please try again later.' });
  }
});

router.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/registreren.html'));
});
module.exports = router;
