const { User } = require("../models");

const register = async (req, res, next) => {
    try {
      
    const newUser = await User.create(req.body);

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

module.exports = { register };
