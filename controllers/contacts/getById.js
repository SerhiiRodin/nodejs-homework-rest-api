// const { getContactById } = require("../../models/contacts");

const { Contact } = require("../../models/");

const getById = async (req, res, next) => {
  const { contactId } = req.params;
  try {
    // Contact.findOne({_id: contactId}) поиск по заданому критерию id
    // const contactById = await Contact.findOne({ _id: contactId });
    const contactById = await Contact.findById(contactId);

    res.status(200).json(contactById);
  } catch (error) {
    error.status = 404;
    error.message = `Contact with id:'${contactId}' not found!!!`;
    next(error);
    // res.status(500).json({ message: "Server error!!!" });
  }
};

module.exports = getById;
