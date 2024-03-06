const express = require('express');
const reservController = require('../controllers/reservationController');
const router = express.Router();

// GET route to reservation page
router.get('/reservation', reservController.reservationPage)

module.exports = router;