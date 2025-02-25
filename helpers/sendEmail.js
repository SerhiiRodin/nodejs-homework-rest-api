const nodemailer = require("nodemailer");

require("dotenv").config();

// Для META

// const { META_PASSWORD } = process.env;

// const nodemailerConfig = {
//   host: "smtp.meta.ua",
//   port: 465,
//   secure: true,
//   auth: {
//     user: "rodinserj@meta.ua",
//     pass: META_PASSWORD,
//   },
// };

// const transporter = nodemailer.createTransport(nodemailerConfig);

// // const emailOptions = {
// //   from: "rodinserj@meta.ua",
// //   to: "fojano7280@lukaat.com",
// //   subject: "Nodemailer test",
// //   text: "Привет. Мы тестируем отправку писем!",
// // };

// // transporter
// //   .sendMail(emailOptions)
// //   .then((info) => console.log(info))
// //   .catch((err) => console.log(err));

// const sendMail = async (data) => {
//   const email = { ...data, from: "rodinserj@meta.ua" };
//   await transporter.sendMail(email);

//   return true;
// };

// module.exports = sendMail;

// Для Укр.нет
const { UKR_NET_EMAIL, UKR_NET_PASSWORD } = process.env;

const nodemailerConfig = {
  host: "smtp.ukr.net",
  port: 465,
  secure: true,
  auth: {
    user: UKR_NET_EMAIL,
    pass: UKR_NET_PASSWORD,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

const sendEmail = async (data) => {
  const email = { ...data, from: UKR_NET_EMAIL };
  await transport.sendMail(email);

  return true;
};

module.exports = sendEmail;
