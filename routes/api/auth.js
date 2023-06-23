const express = require("express");

const router = express.Router();

// Для валидации входящих данных Joi
const { validation } = require("../..//middlewares");
const { registerJoiSchema, loginJoiSchema } = require("../../models/user");

const controllers = require("../../controllers/auth");

const { authenticate } = require("../../middlewares");

// signup - registration
router.post("/register", validation(registerJoiSchema), controllers.register);

// signin - login
router.post("/login", validation(loginJoiSchema), controllers.login);

// logout
router.post("/logout", authenticate, controllers.logout);

// current
router.get("/current", authenticate, controllers.current);


module.exports = router;
