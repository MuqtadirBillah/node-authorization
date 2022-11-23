const express = require("express");
const userController = require("../controllers/userController")
const userRouter = express.Router();
const { isAuthenticated } = require("../middlewares");

userRouter.route("/joke").get(isAuthenticated, userController.getJoke);

module.exports = userRouter;