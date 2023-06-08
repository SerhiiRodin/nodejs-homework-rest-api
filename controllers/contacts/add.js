const Joi = require("joi");
const { addContact } = require("../../models/contacts");

const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

const add = async (req, res, next) => {
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
};

module.exports = add;
