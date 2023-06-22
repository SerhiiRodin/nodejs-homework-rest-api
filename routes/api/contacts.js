const express = require("express");

const router = express.Router();

const {
  isValidId,
  validateFavorite,
  authenticate,
} = require("../../middlewares");

// Для валидации входящих данных Joi
const { validation } = require("../../middlewares");
const {
  addJoiSchema,
  patchFavoriteJoiSchema,
} = require("../../models/contact");

const controllers = require("../../controllers/contacts");

router.get("/", authenticate, controllers.getAllContacts);

router.get("/:contactId", authenticate, isValidId, controllers.getById);

// Вставляем валидацию, как middlewares перед работой контроллера
router.post("/", authenticate, validation(addJoiSchema), controllers.add);

router.put(
  "/:contactId",
  authenticate,
  isValidId,
  validation(addJoiSchema),
  controllers.updateById
);

router.delete("/:contactId", authenticate, isValidId, controllers.removeById);

router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  validateFavorite,
  validation(patchFavoriteJoiSchema),
  controllers.updateByIdFavorite
);

module.exports = router;
