const handleMongooseError = (error, data, next) => {
  const { name, code } = error;

  // Обр. ошибки Mongoose, что такой Email есть в БД.
  if (name === "MongoServerError" && code === 11000) {
    error.status = 409;
    error.message = "Email in use";
    next(error);
    return;
  }

  error.status = 400;
  next();
};

module.exports = handleMongooseError;
