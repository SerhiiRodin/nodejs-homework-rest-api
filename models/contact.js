const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../middlewares");

// Создаем схему
const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set field 'name' for contact"],
    },
    email: {
      type: String,
      required: [true, "Set field 'email' for contact"],
      //   Если поле должно быть уникальным
      //   unique: true,
    },
    phone: {
      type: String,
      required: [true, "Set field 'phone' for contact"],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

// Чтоб ошибки которые ловит mongoose схема имели статус создаем middleware.
// Если mongoose схема выдает ошибку, то срабатывает эта middleware, присваивается статус 400
contactSchema.post("save", handleMongooseError);

const addJoiSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.bool(),
});

const patchFavoriteJoiSchema = Joi.object({
  favorite: Joi.bool().required(),
});

// Создаем модель
const Contact = model("contact", contactSchema);

module.exports = { Contact, addJoiSchema, patchFavoriteJoiSchema };
