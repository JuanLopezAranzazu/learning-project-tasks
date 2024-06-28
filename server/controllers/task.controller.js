// models
const Task = require("../models/task.model");

const findAllTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({}).populate("user");
    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
};

// obtener tareas por usuarios
const findAllTasksByUser = async (req, res, next) => {
  try {
    const { userId } = req;
    // buscar las tareas del usuario
    const tasks = await Task.find({ user: userId });
    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
};

const findOneTask = async (req, res, next) => {
  try {
    const { params } = req;
    const { id } = params;
    // buscar la tarea
    const task = await Task.findById(id);
    if (!task) {
      res
        .status(404)
        .json({ message: `La tarea con id ${id} no se encuentra` });
      return;
    }
    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
};

const createTask = async (req, res, next) => {
  try {
    const { userId, body } = req;
    // guardar la tarea con el id del usuario
    const newTask = new Task({
      ...body,
      user: userId,
    });
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    if (error.name === "ValidationError" || error.name === "MongoError") {
      res.status(400).json({ message: error.message });
    } else {
      next(error);
    }
  }
};

const updateTask = async (req, res, next) => {
  try {
    const { params, body } = req;
    const { id } = params;
    // buscar la tarea
    const task = await Task.findById(id);
    if (!task) {
      res
        .status(404)
        .json({ message: `El tarea con id ${id} no se encuentra` });
      return;
    }
    // actualizar la tarea
    const taskUpdated = await Task.findByIdAndUpdate(
      id,
      { ...body },
      { new: true }
    );
    res.status(200).json(taskUpdated);
  } catch (error) {
    if (error.name === "ValidationError" || error.name === "MongoError") {
      res.status(400).json({ message: error.message });
    } else {
      next(error);
    }
  }
};

const deleteTask = async (req, res, next) => {
  try {
    const { params } = req;
    const { id } = params;
    // buscar el Task
    const task = await Task.findById(id);
    if (!task) {
      res
        .status(404)
        .json({ message: `La tarea con id ${id} no se encuentra` });
      return;
    }
    // eliminar el Task
    await Task.deleteOne({ _id: id });
    res.status(204).json({ message: "Tarea eliminado con éxito" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  findAllTasks,
  findAllTasksByUser,
  findOneTask,
  createTask,
  updateTask,
  deleteTask,
};
