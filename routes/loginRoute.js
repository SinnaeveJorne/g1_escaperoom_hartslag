const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../config/db'); // Import the database connection
const router = express.Router();
const path = require('path');


router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Validate required fields
  if (!email || !password) {
    return res.json({ 
      message: 'Vereiste parameters ontbreken', 
      inputtype: !email ? 'email' : 'password'  // Specify which field is missing
    });
  }

  try {
    // Check if the user exists
    const userQuery = 'SELECT * FROM user WHERE email = ?';
    const users = await db.query(userQuery, [email]);

    if (users.length === 0) {
      return res.json({
        type: 'error',
        message: 'Ongeldige e-mail of wachtwoord',
        inputtype: 'email'  // Specify the issue with the email
      });
    }

    const user = users[0];

    console.log(user);
    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.hashed_password);

    if (!isPasswordValid) {
      return res.json({
        type: 'error',
        message: 'Ongeldige e-mail of wachtwoord',
        inputtype: 'password'  // Specify the issue with the password
      });
    }

    // Store user information in the session
    req.session.userId = user.id;
    req.session.userName = user.username;
    req.session.firstlogin = user.isFirstLogin;
    //set firstlogin to false
    const updateQuery = 'UPDATE user SET isFirstLogin = 0 WHERE id = ?';
    await db.query(updateQuery, [user.id]);
    

    return res.json({
      type: 'succes', // Dutch message
    });
  } catch (error) {
    console.error('Fout bij inloggen:', error); // Dutch message
    return res.json({ message: 'Er is een fout opgetreden. Probeer het later opnieuw.' }); // Dutch message
  }
});

// Check if the user is already logged in (for session validation)
router.get('/login', (req, res) => {
  if (req.session.userId) {
    return res.json({
      message: 'Je bent al ingelogd', // Dutch message
      userId: req.session.userId
    });
  }
  res.sendFile(path.join(__dirname, '../public/login.html'));
});

// Optional: Test route to check session info
router.get('/test', (req, res) => {
  if (req.session.userId) {
    return res.json({
      message: 'Je bent ingelogd', // Dutch message
      user: {
        id: req.session.userId
      }
    });
  }
  res.json({ message: 'Je bent niet ingelogd' }); // Dutch message
});

module.exports = router;
