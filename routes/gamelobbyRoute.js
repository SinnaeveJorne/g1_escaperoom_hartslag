const express = require('express');
const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');

const router = express.Router();
 

router.get('/gamelobby', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/game.html'));
  }
  );


module.exports = router;
