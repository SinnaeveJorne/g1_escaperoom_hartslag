const express = require('express');
const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');

const router = express.Router();
 

router.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/login.html'));
  }
  );

router.post('/login', (req, res) => {
  const { email, password } = req.body;

  fs.readFile('users.json', 'utf8', (err, data) => {
    if (err) throw err;
    const users = JSON.parse(data);

    const user = users.find(u => u.email === email);
    if (!user) {
      return res.status(400).send('Email of wachtwoord onjuist');
    }

    bcrypt.compare(password, user.wachtwoord, (err, result) => {
      if (err) throw err;

      if (result) {
        req.session.user = user;
        res.status(200).send('Inloggen succesvol');
      } else {
        res.status(400).send('Email of wachtwoord onjuist');
      }
    });
  });
});

module.exports = router;
