// models
const Role = require("../models/role.model");

const findAllRoles = async (req, res, next) => {
  try {
    const roles = await Role.find({});
    res.status(200).json(roles);
  } catch (error) {
    next(error);
  }
};

module.exports = { findAllRoles };
