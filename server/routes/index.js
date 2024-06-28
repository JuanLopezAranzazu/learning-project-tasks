const express = require("express");

//routes
const authRouter = require("./auth.router");
const userRouter = require("./user.router");
const taskRouter = require("./task.router");
const roleRouter = require("./role.router");

function routes(app) {
  const router = express.Router();
  app.use("/api/v1", router);
  router.use("/auth", authRouter);
  router.use("/user", userRouter);
  router.use("/task", taskRouter);
  router.use("/role", roleRouter);
}

module.exports = routes;
