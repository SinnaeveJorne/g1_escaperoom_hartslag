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
  const users = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/users.json')));
  const user = users.find(user => user.email === email);

  if (user) {
    if(user.wachtwoord === password) {
      req.session.username = user.username, req.session.email = user.email, req.session.password = user.password, req.session.userid = user.id,req.session.isadmin = user.isadmin;
      res.json({ success: true, message: 'Login successful' });
    } else {
      res.json({ success: false, message: 'Het ingevulde wachtwoord is niet correct' });
    }
  }
  else{
    res.json({ success: false, message: 'Dit account bestaat niet'});
  }
   
});

const crypto = require('crypto');

function generateSessionId() {
  return crypto.randomBytes(16).toString('hex'); // 32-character hex string
}


module.exports = router;
