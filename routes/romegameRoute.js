const express = require('express');
const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');

const router = express.Router();
 

router.get('/romegame', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/RomeGame.html'));
  }
  );


module.exports = router;