const express = require('express');
const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');

const router = express.Router();

router.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/registreren.html'));
});

router.post('/register', (req, res) => {
  const { naam, voornaam, email, wachtwoord, herhaalwachtwoord } = req.body;

  if (wachtwoord !== herhaalwachtwoord) {
    return res.status(400).send('Wachtwoorden komen niet overeen');
  }

  fs.readFile('users.json', 'utf8', (err, data) => {
    if (err) throw err;
    const users = JSON.parse(data);

    const emailExists = users.some(user => user.email === email);
    if (emailExists) {
      return res.status(400).send('Email al geregistreerd');
    }

    bcrypt.hash(wachtwoord, 10, (err, hashedPassword) => {
      if (err) throw err;

      const newUser = {
        naam,
        voornaam,
        email,
        wachtwoord: hashedPassword
      };

      users.push(newUser);
      fs.writeFile('users.json', JSON.stringify(users), 'utf8', (err) => {
        if (err) throw err;
        res.status(201).send('Registratie succesvol');
      });
    });
  });
});

module.exports = router;
