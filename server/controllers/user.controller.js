const bcrypt = require("bcrypt");
// models
const User = require("./../models/user.model");
const Role = require("./../models/role.model");

const findAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({}).populate("role");
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

const findOneUser = async (req, res, next) => {
  try {
    const { params } = req;
    const { id } = params;
    // buscar el usuario
    const user = await User.findById(id).populate("role");
    if (!user) {
      res
        .status(404)
        .json({ message: `El usuario con id ${id} no se encuentra` });
      return;
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

const createUser = async (req, res, next) => {
  try {
    const { body } = req;
    const { email, password, roleName, ...rest } = body;
    // validar que el email no exista
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(400).json({ message: `El correo ${email} ya existe` });
    }
    // encriptar la contraseña
    const hash = await bcrypt.hash(password, 10);
    // buscar el rol customer
    const foundRole = await Role.findOne({ name: roleName });
    if (!foundRole) {
      return res.status(400).json({ message: `El rol ${roleName} no existe` });
    }
    // guardar el usuario en la base de datos
    const newUser = new User({
      ...rest,
      email,
      password: hash,
      role: foundRole._id,
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    if (error.name === "ValidationError" || error.name === "MongoError") {
      res.status(400).json({ message: error.message });
    } else {
      next(error);
    }
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { params, body } = req;
    const { id } = params;
    const { email, password, ...rest } = body;
    // buscar el usuario
    const user = await User.findById(id);
    if (!user) {
      res
        .status(404)
        .json({ message: `El usuario con id ${id} no se encuentra` });
      return;
    }
    // validar que el email no exista
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      res.status(400).json({ message: `El correo ${email} ya existe` });
      return;
    }
    // encriptar la contraseña
    const hash = await bcrypt.hash(password, 10);
    // actualizar el usuario
    const userUpdated = await User.findByIdAndUpdate(
      id,
      { email, password: hash, ...rest },
      { new: true }
    );
    res.status(200).json(userUpdated);
  } catch (error) {
    if (error.name === "ValidationError" || error.name === "MongoError") {
      res.status(400).json({ message: error.message });
    } else {
      next(error);
    }
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { params } = req;
    const { id } = params;
    // buscar el usuario
    const user = await User.findById(id);
    if (!user) {
      res
        .status(404)
        .json({ message: `El usuario con id ${id} no se encuentra` });
      return;
    }
    await User.deleteOne({ _id: id });
    res.status(204).json({ message: "Usuario eliminado con éxito" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  findAllUsers,
  findOneUser,
  createUser,
  updateUser,
  deleteUser,
};
