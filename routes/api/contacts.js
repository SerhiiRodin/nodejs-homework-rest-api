const express = require("express");

const router = express.Router();

const { contacts: controllers } = require("../../controllers");

router.get("/", controllers.getAllContacts);

router.get("/:contactId", controllers.getById);

router.post("/", controllers.add);

router.put("/:contactId", controllers.updateById);

router.delete("/:contactId", controllers.removeById);

module.exports = router;
