const express = require("express");

const router = express.Router();

// Для валидации входящих данных Joi
const { validation } = require("../../middlewares");
const { joiSchema } = require("../../models/contact");

const { contacts: controllers } = require("../../controllers");

router.get("/", controllers.getAllContacts);

router.get("/:contactId", controllers.getById);

// Вставляем валидацию, как middlewares перед работой контроллера
router.post("/", validation(joiSchema), controllers.add);

router.put("/:contactId", validation(joiSchema), controllers.updateById);

router.delete("/:contactId", controllers.removeById);

module.exports = router;
