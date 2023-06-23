const { Contact } = require("../models");

const add = async (req, res, next) => {
  try {
    // // Проверка уникальности по email
    // const existingContact = await Contact.findOne({ email: req.body.email });

    // if (existingContact) {
    //   const error = new Error(
    //     `Contact with email:'${req.body.email}' already have.`
    //   );
    //   error.status = 400;
    //   throw error;
    // }

    // Достаем user-a который делает запрос с поля req.user которое создали в миделваре authenticate
    const { _id: owner } = req.user;

    const newContact = await Contact.create({ ...req.body, owner });
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
    // res.status(500).json({ message: "Server error!!!" });
  }
};

const getAllContacts = async (req, res, next) => {
  const { _id: owner } = req.user;
  // Вытаскиваем параметры из строки запроса
  const { favorite } = req.query;

  const favoriteOptions = favorite
    ? { $and: [{ owner }, { favorite }] }
    : { owner };

  try {
    const contacts = await Contact.find(
      favoriteOptions,
      "-createdAt -updatedAt"
    );
    res.status(200).json(contacts);
  } catch (error) {
    next(error);
    // res.status(500).json({ message: "Server error!!!" });
  }
};

const getById = async (req, res, next) => {
  const { contactId } = req.params;

  try {
    // Contact.findOne({_id: contactId}) поиск по заданому критерию id
    // const contactById = await Contact.findOne({ _id: contactId });
    const contactById = await Contact.findById(
      contactId,
      "-createdAt -updatedAt"
    );

    if (!contactById) {
      const error = new Error(`Contact with id:'${contactId}' not found!!!`);
      error.status = 404;
      next(error);
    }

    res.status(200).json(contactById);
  } catch (error) {
    // error.status = 404;
    // error.message = `Contact with id:'${contactId}' not found!!!`;
    next(error);
  }
};

const removeById = async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const removeContactById = await Contact.findByIdAndRemove(contactId);

    if (removeContactById === null) {
      const error = new Error(`Contact with id:'${contactId}' not found!!!`);
      error.status = 404;
      throw error;
    }
    res.status(200).json({
      message: `Contact deleted`,
      // data: removeContactById,
    });
  } catch (error) {
    next(error);
  }
};

const updateById = async (req, res, next) => {
  const { contactId } = req.params;

  try {
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {
      new: true,
    });

    if (!result) {
      const error = new Error(`Contact with id:'${contactId}' not found!!!`);
      error.status = 404;
      next(error);
      return;
    }

    res.status(200).json(result);
  } catch (error) {
    // error.status = 404;
    // error.message = `Contact with id:'${contactId}' not found!!!`;
    next(error);
  }
};

const updateByIdFavorite = async (req, res, next) => {
  const { contactId } = req.params;
  const { favorite } = req.body;

  try {
    const result = await Contact.findByIdAndUpdate(
      contactId,
      { favorite },
      {
        new: true,
      }
    );

    if (!result || result === null) {
      const error = new Error(`Contact with id:'${contactId}' not found!!!`);
      error.status = 404;
      next(error);
      return;
    }

    res.status(200).json(result);
  } catch (error) {
    // error.status = 404;
    // error.message = `Contact with id:'${contactId}' not found!!!`;
    next(error);
  }
};

module.exports = {
  add,
  getAllContacts,
  getById,
  removeById,
  updateById,
  updateByIdFavorite,
};
