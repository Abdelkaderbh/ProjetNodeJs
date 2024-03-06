const express = require('express');
const roomController = require('../controllers/roomController');
const router = express.Router();

// GET route to display the list of rooms
router.get('/allroom', roomController.afficherListeRooms)