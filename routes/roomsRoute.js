const express = require('express');
const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');
const db = require('../config/db');
const { get } = require('http');

const router = express.Router();
 

router.get('/rooms', async(req, res) => {
  //get all the rooms also count users in room
  const getRoomsQuery = 'SELECT gamerooms.name, COUNT(gameroom.userId) as aantalusers, gamerooms.password FROM gamerooms LEFT JOIN gameroom ON gamerooms.roomId = gameroom.roomId GROUP BY gamerooms.roomId';
  const rooms = await db.query(getRoomsQuery);
  console.log(rooms);
  res.render('rooms', { rooms: rooms});
  }
  );

 


module.exports = router;
