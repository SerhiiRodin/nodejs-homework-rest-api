const { Schema, model } = require("mongoose");
const Joi = require("joi");

const handleMongooseError = require("../middlewares/handleMongooseError");

// Регулярное выраж. для email
// const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const subscriptionList = ["starter", "pro", "business"];

const userSchema = new Schema(
  {
    password: {
      type: String,
      minlength: 3,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      //   match: emailRegexp,
      unique: true,
    },
    subscription: {
      type: String,
      enum: subscriptionList,
      default: "starter",
    },
    token: {
      type: String,
      default: null,
    },
    avatarURL: {
      type: String,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, "Verify token is required"],
    },
  },
  { versionKey: false, timestamps: true }
);

// Если mongoose схема выдает ошибку, то срабатывает эта middleware, присваивается статус 400
userSchema.post("save", handleMongooseError);

const registerJoiSchema = Joi.object({
  password: Joi.string().min(3).required(),
  //   email: Joi.string().pattern(emailRegexp).required(),
  email: Joi.string().required(),
  subscription: Joi.string().valid(...subscriptionList),
  token: Joi.string(),
});

const loginJoiSchema = Joi.object({
  password: Joi.string().required(),
  //   email: Joi.string().pattern(emailRegexp).required(),
  email: Joi.string().required(),
});

const subscriptionJoiSchema = Joi.object({
  subscription: Joi.string()
    .valid(...subscriptionList)
    .required(),
});

const userEmailVerifyJoiSchema = Joi.object({
  email: Joi.string().required(),
});

const User = model("user", userSchema);

module.exports = {
  User,
  registerJoiSchema,
  loginJoiSchema,
  subscriptionJoiSchema,
  userEmailVerifyJoiSchema,
};
