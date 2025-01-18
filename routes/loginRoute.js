const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../config/db'); // Import the database connection
const router = express.Router();
const path = require('path');

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Validate required fields
  if (!email || !password) {
    return res.status(400).json({ message: 'Missing parameters' });
  }

  try {
    // Check if the user exists
    const userQuery = 'SELECT id, firstname, lastname, hashed_password FROM user WHERE email = ?';
    const users = await db.query(userQuery, [email]);

    if (users.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const user = users[0];

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.hashed_password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Store user information in the session
    req.session.userId = user.id;
    req.session.userName = `${user.firstname} ${user.lastname}`;

    return res.status(200).json({
      message: 'Login successful',
      user: {
        id: user.id,
        name: `${user.firstname} ${user.lastname}`,
        email,
      },
    });
  } catch (error) {
    console.error('Error logging in:', error);
    return res.status(500).json({ message: 'An error occurred. Please try again later.' });
  }
});

router.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/login.html'));
});

module.exports = router;
