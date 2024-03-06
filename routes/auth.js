const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authenticate = require("../middleware/authentication");

router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.get("/test", authenticate, userController.test);
router.get("/register", userController.registerPage);

module.exports = router;
