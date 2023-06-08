const express = require("express");

const {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
} = require("../../models/contacts");

const Joi = require("joi");

const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

const router = express.Router();

// const contacts = require("../../models/contacts.json");

router.get("/", async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.status(200).json(contacts);
  } catch (error) {
    next(error);
    // res.status(500).json({ message: "Server error!!!" });
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contactById = await getContactById(contactId);

    if (contactById === null) {
      const error = new Error(`Contact with id:'${contactId}' not found!!!`);
      error.status = 404;
      throw error;
      // res
      //   .status(404)
      //   .json({ message: `Contact with id:'${contactId}' not found!!!` });
      // return;
    }
    res.status(200).json(contactById);
  } catch (error) {
    next(error);
    // res.status(500).json({ message: "Server error!!!" });
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }

    const newContact = await addContact(req.body);
    if (newContact === null) {
      const error = new Error(
        `Contact with name:'${req.body.name}' or email:'${req.body.email}' already have.`
      );
      error.status = 400;
      throw error;
    }
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
    // res.status(500).json({ message: "Server error!!!" });
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }

    const { contactId } = req.params;
    const result = await updateContact(contactId, req.body);

    if (result === null) {
      const error = new Error(`Contact with id:'${contactId}' not found!!!`);
      error.status = 404;
      throw error;
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const removeContactById = await removeContact(contactId);

    if (removeContactById === null) {
      const error = new Error(`Contact with id:'${contactId}' not found!!!`);
      error.status = 404;
      throw error;
    }
    res.status(200).json({
      message: `Contact with id:'${contactId}' deleted`,
      data: removeContactById,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
