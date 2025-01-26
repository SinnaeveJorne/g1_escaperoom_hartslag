const express = require('express');
const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');
const db = require('../config/db');

const router = express.Router();
 

router.get('/getgame', async(req, res) => {
    const getRoomsQuery = 'SELECT * FROM gameroom where userId = ?';
    const Getlevel = await db.query(getRoomsQuery, [req.session.userId]);
    if(Getlevel.length === 0) {
       return res.json({error: 'No rooms found'});
    }
    res.render('games', { level: Getlevel[0].userLevel});

  });



module.exports = router;
