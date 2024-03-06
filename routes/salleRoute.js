const express = require('express');
const salleController = require('../controllers/salleController');
const router = express.Router();

// GET route to display the list of salles
router.get('/allsalle', salleController.afficherListeSalles)
router.get("/salles", salleController.allsallePage);
module.exports = router;