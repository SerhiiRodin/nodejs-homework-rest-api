// const Joi = require("joi");

const { updateContact } = require("../../models/contacts");

// Для валидации не в middlewares а тут в контроллере
// const contactSchema = Joi.object({
//   name: Joi.string().required(),
//   email: Joi.string().required(),
//   phone: Joi.string().required(),
// });

const updateById = async (req, res, next) => {
  try {
    // const { error } = contactSchema.validate(req.body);
    // if (error) {
    //   error.status = 400;
    //   throw error;
    // }

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
};

module.exports = updateById;
