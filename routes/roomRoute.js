const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const db = require('../config/db'); 
const { get } = require('http');


router.post('/joinroom'), async (req, res) => {
  const {roompassword, roomname } = req.body;
  const checkRoomNameQuery = 'SELECT * FROM gamerooms WHERE name = ? and password = ?';
  const roomDetails = await db.query(checkRoomNameQuery, [roomname, roompassword]);
  if(roomDetails.length === 0) {
    return res.json({
      type: 'error',
      message: 'Deze kamer bestaat niet'
    });
  }
  else
  {
    const joinRoomQuery = 'INSERT INTO gameroom (userId, roomId) VALUES (?, ?)';
    await db.query(joinRoomQuery, [req.session.userId, roomDetails[0].roomId]);
    res.redirect('/room/' + roomname);
  }


}

router.post('/createroom', async (req, res) => {
  console.log("dit is de aller eerste test");
  
  let { roompassword, roomname } = req.body;
  console.log(req.body);

  // Check if the room name already exists
  const checkRoomNameQuery = 'SELECT * FROM gamerooms WHERE name = ?';
  const roomDetails = await db.query(checkRoomNameQuery, [roomname]);

  if (roomDetails.length !== 0) {
    return res.json({
      type: 'error',
      message: 'Deze kamernaam bestaat al'
    });
  }

  console.log("dit is test2");
  

  
  //check if password is empty
  if(roompassword === '') {
    roompassword = null;
  }
  const createRoomQuery = 'INSERT INTO gamerooms (name, password) VALUES (?, ?)';
  await db.query(createRoomQuery, [roomname, roompassword]);
  //get the id of last inserted room
  const getRoomIdQuery = 'Select * from gamerooms where name = ?';
  const getId = await db.query(getRoomIdQuery, [roomname]);

  const insertPlayerInRoomQuery = 'INSERT INTO gameroom (userId, roomId) VALUES (?, ?)';
  await db.query(insertPlayerInRoomQuery, [req.session.userId, getId[0].roomId]);

  // Respond with success
  res.json({
    type: 'succes',
    message: roomname
  });
});





router.get('/room/:roomId', async (req, res) => {
  const requestedRoomId = req.params.roomId; // The requested room ID from the URL

  // Check if the user has any existing rooms
  const checkUserRoomsQuery = 'SELECT * FROM gameroom g JOIN gamerooms r ON g.roomId = r.roomId WHERE g.userId = ?';
  const userRooms = await db.query(checkUserRoomsQuery, [req.session.userId]);
  
  if (userRooms.length === 0) {
    console.log("User does not have any rooms");

    const checkRoomPasswordQuery = 'SELECT * FROM gamerooms WHERE name = ?';
    const roomDetails = await db.query(checkRoomPasswordQuery, [requestedRoomId]);

    if (roomDetails.length === 0) {
      console.log("Room not found");
      return res.status(404).json({ message: 'Room not found' });
    } else {
      if (roomDetails[0].password !== null) {
        return res.status(401).json({ message: 'Room requires a password' });
      } else {
        const joinRoomQuery = 'INSERT INTO gameroom (userId, roomId) VALUES (?, ?)';
        await db.query(joinRoomQuery, [req.session.userId, roomDetails[0].roomId]);
        res.redirect('/room/' + requestedRoomId);
      }
    }
  } 
  else {
     if(userRooms[0].name !== requestedRoomId) {
       res.redirect('/room/' + userRooms[0].name);
     }

     else {
      res.sendFile(path.join(__dirname, '../public/room.html'));
     }
  }
});


module.exports = router;