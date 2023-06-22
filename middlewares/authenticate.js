const jwt = require("jsonwebtoken");
require("dotenv").config();

// const { User } = require("../models");


const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  // если не пришел токе поля authorization нет и
  // authorization.split выдает ошибку, ставим знач.по умолчанию
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer") {
    const error = new Error(`Not authorized`);
    error.status = 401;
    next(error);
  }

  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    // const user = await User.findById(id);
    // if (!user) {
    //   const error = new Error(`Not authorized`);
    //   error.status = 401;
    //   next(error);
    // }
  } catch {
    const error = new Error(`Not authorized`);
    error.status = 401;
    next(error);
  }

  next();
};

module.exports = authenticate;
