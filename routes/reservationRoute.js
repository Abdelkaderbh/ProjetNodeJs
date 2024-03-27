const express = require("express");
const reservController = require("../controllers/reservationController");
const router = express.Router();
const auth = require("../middleware/authentication");
// GET route to reservation page
router.get("/reservation", reservController.reservationPage);
// POST route to add a reservation
router.post("/addreservation/:id", auth, reservController.addReservation);
router.get("/myrerservations", auth, reservController.userReservationsPage);
router.post("/cancelreservation", auth, reservController.removeReservation);
module.exports = router;
