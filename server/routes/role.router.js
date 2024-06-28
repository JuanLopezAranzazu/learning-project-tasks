const express = require("express");
const roleRouter = express.Router();

//controllers
const { findAllRoles } = require("../controllers/role.controller");
//middlewares
const verifyJWT = require("./../middlewares/verifyJWT");
const verifyRoles = require("./../middlewares/verifyRoles");

// routes
// api para obtener todos los roles
roleRouter.get("/", verifyJWT, verifyRoles("admin"), findAllRoles);

module.exports = roleRouter;
