const express = require('express');
const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');

const router = express.Router();
 

router.get('/rooms', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/rooms.html'));
  }
  );

  router.get('/getrooms', (req, res) => {
    const rooms = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/roomcodes.json')));
    if(req.session.username){
      res.json({ success: true, rooms: rooms });
    }
    else
    {
      res.json({ success: false, message: 'Je bent niet ingelogd'});
    }
  
  });


module.exports = router;
