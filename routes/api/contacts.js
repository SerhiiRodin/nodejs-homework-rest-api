const express = require("express");

const router = express.Router();

const { isValidId } = require("../../middlewares");

// Для валидации входящих данных Joi
const { validation } = require("../../middlewares");
const {
  addJoiSchema,
  patchFavoriteJoiSchema,
} = require("../../models/contact");

const { contacts: controllers } = require("../../controllers");
const updateByIdFavorite = require("../../controllers/contacts/updateByIdFavorite");

router.get("/", controllers.getAllContacts);

router.get("/:contactId", isValidId, controllers.getById);

// Вставляем валидацию, как middlewares перед работой контроллера
router.post("/", validation(addJoiSchema), controllers.add);

router.put(
  "/:contactId",
  isValidId,
  validation(addJoiSchema),
  controllers.updateById
);

router.delete("/:contactId", isValidId, controllers.removeById);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validation(patchFavoriteJoiSchema),
  controllers.updateByIdFavorite
);

module.exports = router;
