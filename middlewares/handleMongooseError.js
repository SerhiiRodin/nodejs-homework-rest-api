const handleMongooseError = (error, data, next) => {
  const { name, code } = error;

  // Добавляем статус 409, если поля unique: true повторяются.
  if (name === "MongoServerError" && code === 11000) {
    error.status = 409;
    next(error);
    return;
  }

  error.status = 400;
  next();
};

module.exports = handleMongooseError;
