const nodemailer = require("nodemailer");
const ejs = require("ejs");
const fs = require("fs");
const path = require("path");
const sendEmail = async (email, subject, payload, template) => {
  // create reusable transporter object using the default SMTP transport

  const transporter = nodemailer.createTransport({
    // service: "gmail",
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
      user: process.env.MAIL_USER, // generated ethereal user
      pass: process.env.MAIL_PASSWORD, // generated ethereal password
    },
  });
  const source = fs.readFileSync(path.join(__dirname, template), "utf8");
  const compiledTemplate = ejs.compile(source);

  const message = {
    from: `${process.env.MAIL_NAME} <${process.env.MAIL_FROM_EMAIL}>`, // sender address
    to: email, // list of receivers
    subject: subject, // Subject line
    html: compiledTemplate(payload),
  };

  const info = await transporter.sendMail(message);
  console.log("Message sent: %s", info.messageId);
};
module.exports = { sendEmail };
