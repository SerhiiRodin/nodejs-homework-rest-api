const express = require("express");

const router = express.Router();

// Для валидации входящих данных Joi
const { validation } = require("../..//middlewares");
const { registerJoiSchema, loginJoiSchema } = require("../../models/user");

const controllers = require("../../controllers/auth");

// signup
router.post("/register", validation(registerJoiSchema), controllers.register);

// signup

module.exports = router;
