const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");
const { v4: uuidv4 } = require("uuid");

const sendEmail = require("../helpers/sendEmail");

require("dotenv").config();

const { User } = require("../models");
const { error } = require("console");

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
    //  Дает путь к временной аватарке
    const avatarURL = gravatar.url(email);
    const verificationToken = uuidv4();

    const newUser = await User.create({
      ...req.body,
      password: hashPassword,
      //   avatarURL,
      avatarURL: `${avatarURL}?s=250&d=retro`,
      verificationToken,
    });
    // Отправка письма
    const { BASE_URL } = process.env;

    const verifyEmail = {
      to: email,
      subject: "Verify email",
      html: `<a target="_blank" href="${BASE_URL}/users/verify/${verificationToken}">Click verify email</a>`,
    };

    await sendEmail(verifyEmail);

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

const verify = async (req, res, next) => {
  try {
    const { verificationToken } = req.params;

    const user = await User.findOne({ verificationToken });

    if (!user || user === null) {
      const error = new Error(`User not found`);
      error.status = 404;
      throw error;
    }

    await User.findByIdAndUpdate(user._id, {
      verify: true,
      verificationToken: null,
    });

    res.status(200).json({ message: "Verification successful" });
  } catch (error) {
    next(error);
  }
};

const resendVerify = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      const error = new Error("Not authorized");
      error.status = 401;
      throw error;
    }

    if (user.verify) {
      const error = new Error("Verification has already been passed");
      error.status = 400;
      throw error;
    }

    // Повторная отправка письма
    const { BASE_URL } = process.env;

    const verifyEmail = {
      to: email,
      subject: "Verify email",
      html: `<a target="_blank" href="${BASE_URL}/users/verify/${user.verificationToken}">Click verify email</a>`,
    };

    await sendEmail(verifyEmail);

    res.status(200).json({
      message: "Verification email sent",
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

    // Проверяем verify
    if (!user.verify || user.verify === null) {
      const error = new Error(`Not authorized`);
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

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "120h" });

    // Записываем поле токен у user-a и сохраняем изменеия в БД
    // user.token = token;
    //   await user.save();
    //  или
    await User.findByIdAndUpdate(user._id, { token });

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

const logout = async (req, res, next) => {
  const { _id } = req.user;
  try {
    const user = await User.findById(_id);

    if (!user) {
      const error = new Error(`Not authorized`);
      error.status = 401;
      throw error;
    }

    //       user.token = null;
    //       await user.save()
    //  или
    await User.findByIdAndUpdate(_id, { token: null });

    res.status(204).json();

    // next();
  } catch (error) {
    next(error);
  }
};

const current = async (req, res, next) => {
  try {
    const { email, subscription, _id } = req.user;

    const user = await User.findById(_id);

    if (!user) {
      const error = new Error(`Not authorized`);
      error.status = 401;
      throw error;
    }

    res.status(200).json({
      email,
      subscription,
    });
  } catch (error) {
    next(error);
  }
};

const updateSubscription = async (req, res, next) => {
  const { subscription } = req.body;
  const { _id } = req.user;
  try {
    const user = await User.findByIdAndUpdate(
      _id,
      { subscription },
      {
        new: true,
      }
    );

    if (!user) {
      const error = new Error(`Not authorized`);
      error.status = 401;
      throw error;
    }

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

const updateAvatar = async (req, res, next) => {
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;

  try {
    //   Создаем уникальное имя
    const filename = `${_id}_${originalname}`;

    // Путь куда запимываем аватарку и под каким именем
    const avatarsDir = path.join(__dirname, "../", "public", "avatars");
    const resultUpload = path.join(avatarsDir, filename);

    // // Перемещаем с temp public/avatars
    // await fs.rename(tempUpload, resultUpload);
    // // Меняем размер с помощью Jimp и сохраняем public/avatars
    const avatar = await Jimp.read(tempUpload);
    await avatar.resize(250, 250).quality(90).write(resultUpload);

    //  Удаляем в папке temp файл
    await fs.unlink(tempUpload);
    // Создаем путь к аватарке
    const avatarURL = path.join("avatars", filename);
    // Запимываем путь в поле юзера
    await User.findByIdAndUpdate(_id, { avatarURL });
    res.status(200).json({ avatarURL });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  logout,
  current,
  updateSubscription,
  updateAvatar,
  verify,
  resendVerify,
};
