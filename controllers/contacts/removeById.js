const { removeContact } = require("../../models/contacts");

const removeById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const removeContactById = await removeContact(contactId);

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

module.exports = removeById;
