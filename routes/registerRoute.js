const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../config/db'); // Import the database connection
const router = express.Router();
const path = require('path');

router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  // Validate required fields
  if (!username|| !email || !password) {
    return res.status(400).json({ message: 'Missing parameters' });
  }


  try {

    const usernameExists = "Select id From user WHERE username = ?";
    const usernameExistsResult = await db.query(usernameExists, [username]);

    if (usernameExistsResult.length > 0) {
      return res.json({
        type: 'error',
        message: 'Deze gebruikersnaam is al in gebruik',
        inputtype: 'username'
      });
    }
 


    // Check if the user already exists
    const userExistsQuery = 'SELECT id FROM user WHERE email = ?';
    const userExists = await db.query(userExistsQuery, [email]);
    if (userExists.length > 0) {
      return res.json({
        type: 'error',
        message: 'Deze email is al in gebruik',
        inputtype: 'email'
      });
    }

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new user into the database
    const insertUserQuery = `
      INSERT INTO user (username, email, hashed_password)
      VALUES ( ?, ?, ?)
    `;
    await db.query(insertUserQuery, [username, email, hashedPassword]);
     return res.json({
      type: 'succes'
    });
    // can i make session melding a json object?
    req.session.melding = {
      type: 'succes',
      message: 'Uw account is aangemaakt'
    };

  } catch (error) {
    console.error('Error registering user:', error);
    return res.status(500).json({ message: 'An error occurred. Please try again later.' });
  }
});

router.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/registreren.html'));
});
module.exports = router;
