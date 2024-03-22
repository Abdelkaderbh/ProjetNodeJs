const express = require("express");
const salleController = require("../controllers/salleController");
const authenticate = require("../middleware/authentication");
const router = express.Router();

// GET route to display the list of salles
router.get("/salles", authenticate, salleController.allsallePage); //authenticate,
router.post("/addSalle", salleController.addSalle);
module.exports = router;
