// const { getContactById } = require("../../models/contacts");

const { Contact } = require("../../models/");

const getById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    // Contact.findOne({_id: contactId}) поиск по заданому критерию id
    // const contactById = await Contact.findById(contactId);
    const contactById = await Contact.findOne({ _id: contactId });

    if (!contactById || contactById === null) {
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
};

module.exports = getById;
