const { Contact } = require("../../models/");

const add = async (req, res, next) => {
  try {
    const existingContact = await Contact.findOne({ email: req.body.email });

    if (existingContact) {
      const error = new Error(
        `Contact with email:'${req.body.email}' already have.`
      );
      error.status = 400;
      throw error;
    }

    const newContact = await Contact.create(req.body);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
    // res.status(500).json({ message: "Server error!!!" });
  }
};

module.exports = add;
