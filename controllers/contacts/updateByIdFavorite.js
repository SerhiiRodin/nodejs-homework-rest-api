const { Contact } = require("../../models");

const updateByIdFavorite = async (req, res, next) => {
  const { contactId } = req.params;

  try {
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {
      new: true,
    });

    if (!result) {
      const error = new Error(`Contact with id:'${contactId}' not found!!!`);
      error.status = 404;
      next(error);
    }

    res.status(200).json(result);
  } catch (error) {
    // error.status = 404;
    // error.message = `Contact with id:'${contactId}' not found!!!`;
    next(error);
  }
};

module.exports = updateByIdFavorite;
