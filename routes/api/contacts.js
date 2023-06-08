const express = require("express");

const router = express.Router();

// Для валидации входящих данных Joi
const { validation } = require("../../middlewares");
const { contactSchema } = require("../../schemas");

const { contacts: controllers } = require("../../controllers");

router.get("/", controllers.getAllContacts);

router.get("/:contactId", controllers.getById);

// Вставляем валидацию, как middlewares перед работой контроллера
router.post("/", validation(contactSchema), controllers.add);

// Валидация в контроллере
router.put("/:contactId", controllers.updateById);

router.delete("/:contactId", controllers.removeById);

module.exports = router;
