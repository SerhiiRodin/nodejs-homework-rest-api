const express = require("express");

const router = express.Router();

// Для валидации входящих данных Joi
const { validation } = require("../..//middlewares");
const {
  registerJoiSchema,
  loginJoiSchema,
  subscriptionJoiSchema,
} = require("../../models/user");

const controllers = require("../../controllers/auth");

const { authenticate } = require("../../middlewares");

const { upload } = require("../../middlewares");
// const  upload  = require("../../middlewares/upload");

// signup - registration
router.post("/register", validation(registerJoiSchema), controllers.register);

// signin - login
router.post("/login", validation(loginJoiSchema), controllers.login);

// logout
router.post("/logout", authenticate, controllers.logout);

// current
router.get("/current", authenticate, controllers.current);

// subscription change
router.patch(
  "/",
  authenticate,
  validation(subscriptionJoiSchema),
  controllers.updateSubscription
);

// avatar change
router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  controllers.updateAvatar
);

module.exports = router;
