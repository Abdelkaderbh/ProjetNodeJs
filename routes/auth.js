const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

//post methods
router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
//get methods
router.get("/register", userController.registerPage);
router.get("/login", userController.loginPage);
router.get("/logout", userController.logoutUser);

module.exports = router;
