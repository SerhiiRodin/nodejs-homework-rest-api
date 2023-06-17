const { Contact } = require("../../models");

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

module.exports = updateByIdFavorite;
