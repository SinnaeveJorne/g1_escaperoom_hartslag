const express = require('express');
const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');

const router = express.Router();

router.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/registreren.html'));
});


router.post('/register', (req, res) => {
  // Extracting fields from the request body
  const { naam, voornaam, email, wachtwoord, herhaalWachtwoord } = req.body;

  
  if (wachtwoord !== herhaalWachtwoord) {
    return res.status(400).send('Wachtwoorden komen niet overeen');
  }

  try {
    // Path to the users data file
    const usersFilePath = path.join(__dirname, '../data/users.json');

    // Read existing users data
    const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf8'));

    // Check if the email already exists
    const emailExists = users.some(user => user.email === email);
    if (emailExists) {
      return res.status(400).send('Email is al geregistreerd');
    }

    // Create new user object
    const newUser = {
      naam,
      voornaam,
      email,
      wachtwoord // In a real-world scenario, always hash the password before storing it
    };

    // Add the new user to the users array
    users.push(newUser);

    // Write the updated users array back to the file
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));

    // Send a success response
    res.status(201).send('Registratie succesvol');
  } catch (error) {
    console.error('Error handling registration:', error);
    res.status(500).send('Er is een fout opgetreden');
  }
});



module.exports = router;
