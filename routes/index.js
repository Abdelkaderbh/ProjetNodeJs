const express = require("express");
const homePageRouter = express.Router();
const homePageController = require("../controllers/indexPageController");

//render home page
homePageRouter.get("/", homePageController.homePage);

module.exports = homePageRouter;
