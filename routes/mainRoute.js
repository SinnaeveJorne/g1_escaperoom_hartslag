const express = require('express');
const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');
const db = require('../config/db');

const router = express.Router();

// Algemene route voor statische HTML-bestanden
const htmlFiles = [
  'Username.html',
  'verwijderenAccount.html',
  'wachtwoord.html',
  'notfiticationsbewerken.html',
  'notifcatsies.html',
  'leaderbordnormalside.html',
  'instellingen.html',
  'Email.html',
];

// Dynamisch routes aanmaken voor elk HTML-bestand
htmlFiles.forEach((file) => {
  const route = `/${file.replace('.html', '')}`;
  router.get(route, (req, res) => {
    res.sendFile(path.join(__dirname, '../public', file));
  });
});

// Specifieke route voor profiel
router.get('/profiel', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/profile.html'));
});

module.exports = router;
