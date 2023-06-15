const getAllContacts = require("./getAll");
const getById = require("./getById");
const add = require("./add");
const updateById = require("./updateById");
const removeById = require("./removeById");
const updateByIdFavorite = require("./updateByIdFavorite");

module.exports = {
  getAllContacts,
  getById,
  add,
  updateById,
  removeById,
  updateByIdFavorite,
};
