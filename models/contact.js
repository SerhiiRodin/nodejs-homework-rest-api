const { Schema, model } = require("mongoose");
const Joi = require("joi");

// Создаем схему
const contactSchema = new Schema({
  name: {
    type: String,
    required: [true, "Set name for contact"],
  },
  email: {
    type: String,
    //   Если поле должно быть уникальным
    // unique: [true, "This e-mail is already in the database"],
  },
  phone: {
    type: String,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
});

const joiSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.bool(),
});

// Создаем модель
const Contact = model("contact", contactSchema);

module.exports = { Contact, joiSchema };
