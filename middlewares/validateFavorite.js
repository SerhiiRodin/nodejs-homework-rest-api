const validateFavorite = (req, res, next) => {
  const { favorite } = req.body;
  console.log(favorite);
  if (favorite === null) {
    res.status(400).json({ massage: "Missing field favorite" });
    return;
  }
  next();
};

module.exports = validateFavorite;
