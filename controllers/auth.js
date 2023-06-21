const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { User } = require("../models");

const register = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      const error = new Error(`Email in use`);
      error.status = 409;
      throw error;
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({ ...req.body, password: hashPassword });

    res.status(201).json({
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    // Ищем юзера с таким email
    const user = await User.findOne({ email });

    if (!user) {
      const error = new Error(`Email or password is wrong`);
      error.status = 401;
      throw error;
    }

    // Если нашли, то проверяем у этого юзера password с введеным
    const passwordCompare = await bcrypt.compare(password, user.password);

    if (!passwordCompare) {
      const error = new Error(`Email or password is wrong`);
      error.status = 401;
      throw error;
    }

    // Если все совпадает, то создаем token
    const payload = {
      id: user._id,
    };
    const { SECRET_KEY } = process.env;

    const token = jwt.sign(payload, SECRET_KEY);

    res.status(200).json({
      token,
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login };
