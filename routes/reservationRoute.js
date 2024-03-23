const express = require('express');
const reservController = require('../controllers/reservationController');
const router = express.Router();

// GET route to reservation page
router.get('/reservation', reservController.reservationPage)
// POST route to add a reservation
router.post('/addreservation/:id', reservController.addReservation)
module.exports = router;