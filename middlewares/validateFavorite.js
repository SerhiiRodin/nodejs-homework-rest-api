const validateFavorite = (req, res, next) => {
  const { favorite } = req.body;

  if (favorite === undefined) {
    res.status(400).json({ massage: "Missing field favorite" });
    return;
  }
  next();
};

module.exports = validateFavorite;
