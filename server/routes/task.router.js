const express = require("express");
const taskRouter = express.Router();

//controllers
const {
  findAllTasks,
  findAllTasksByUser,
  findOneTask,
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/task.controller");
//middlewares
const verifyJWT = require("../middlewares/verifyJWT");
const verifyRoles = require("../middlewares/verifyRoles");
const verifyID = require("../middlewares/verifyID");

// routes
// api para obtener todas las tareas
taskRouter.get("/", verifyJWT, verifyRoles("admin"), findAllTasks);
// api para obtener las tareas de un usuario
taskRouter.get(
  "/user",
  verifyJWT,
  verifyRoles("admin", "user"),
  findAllTasksByUser
);
// api para obtener una tarea
taskRouter.get(
  "/:id",
  verifyJWT,
  verifyRoles("admin", "user"),
  verifyID,
  findOneTask
);
// api para crear una tarea
taskRouter.post("/", verifyJWT, verifyRoles("admin", "user"), createTask);
// api para actualizar una tarea
taskRouter.put(
  "/:id",
  verifyJWT,
  verifyRoles("admin", "user"),
  verifyID,
  updateTask
);
// api para eliminar una tarea
taskRouter.delete(
  "/:id",
  verifyJWT,
  verifyRoles("admin", "user"),
  verifyID,
  deleteTask
);

module.exports = taskRouter;
