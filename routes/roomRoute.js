const express = require('express');
const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');

const router = express.Router();

// Dynamische route met een ID-parameter
router.get('/room/:id', (req, res) => {
  const roomId = req.params.id; // Haal de ID-parameter op uit de URL
  console.log(`Room ID: ${roomId}`); // Log de ontvangen ID in de console

  // Stuur de room.html terug naar de client
  res.sendFile(path.join(__dirname, '../public/room.html'));
});

module.exports = router;
