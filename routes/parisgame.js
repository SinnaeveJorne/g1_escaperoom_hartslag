const express = require('express');
const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');

const router = express.Router();
 

router.get('/fransgames', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/fransgames.html'));
  }
  );


module.exports = router;
