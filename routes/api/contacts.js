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

// Реалицация валидации в контроллере закоменчина
router.put("/:contactId", validation(contactSchema), controllers.updateById);

router.delete("/:contactId", controllers.removeById);

module.exports = router;
