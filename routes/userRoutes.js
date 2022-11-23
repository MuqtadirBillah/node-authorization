const express = require("express");
const userController = require("../controllers/userController")
const userRouter = express.Router();

userRouter.route("/joke").get(userController.getJoke);

module.exports = userRouter;