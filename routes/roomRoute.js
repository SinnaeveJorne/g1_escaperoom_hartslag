const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();



router.get('/room/:roomId', (req, res) => {
  const requestedRoomId = req.params.roomId; // Haal het gevraagde kamer-ID op uit de URL

  console.log(`Requested Room ID: ${requestedRoomId}`); // Log de ontvangen kamer-ID in de console

  // Lees de kamerdata in en parseer het JSON-bestand
  const roomsData = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/roomcodes.json')));
  const currentUserId = req.session.userid;
  
  let isRoomFound = false;
  let userRoomName = "";

  // Zoek naar de kamer waarin de gebruiker zich bevindt
  for (const room of roomsData) {
    if (room.users.includes(currentUserId)) {
      if (room.roomname !== requestedRoomId) {
        isRoomFound = true;
        userRoomName = room.roomname;
        break; // Stop met zoeken als de kamer gevonden is
      }
    }
  }

  console.log(`Room found: ${isRoomFound}`);

  // Als de gebruiker al in een andere kamer zit, stuur ze daar naartoe
  if (isRoomFound) {
    res.redirect(`/room/${userRoomName}`);
  } else {
    // Anders, toon de standaard kamerpagina
    res.sendFile(path.join(__dirname, '../public/room.html'));
  }
});


module.exports = router;