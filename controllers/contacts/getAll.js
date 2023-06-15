const { Contact } = require("../../models/");

const getAllContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find({}, "-createdAt -updatedAt");
    res.status(200).json(contacts);
  } catch (error) {
    next(error);
    // res.status(500).json({ message: "Server error!!!" });
  }
};

module.exports = getAllContacts;
