const { Router: expressRouter } = require("express");
const router = expressRouter();

// auth routes
const authRouter = require("./authRoutes");
router.use("/auth", authRouter);

// user routes 
const userRouter = require("./userRoutes");
router.use("/user", userRouter);

module.exports = router;