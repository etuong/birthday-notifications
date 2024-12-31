const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");
const sendGrid = require("@sendgrid/mail");
require('dotenv').config();

admin.initializeApp();

// Email service credentials
const emailService = process.env.EMAIL_SERVICE;
const emailUser = process.env.EMAIL_USER;
const emailPass = process.env.EMAIL_PASS;

// SendGrid API key
const sendGridApiKey = process.env.SENDGRID_API_KEY;
sendGrid.setApiKey(sendGridApiKey);

exports.sendEmail = functions.https.onCall(async ({ data }, context) => {
  const { to, message } = data;
  console.log(to)
  console.log(message)

  if (!to || !message) {
    return { success: false, error: "Missing 'to' or 'message'" };
  }

  const options = {
    to: to,
    from: emailUser,
    subject: "Birthday Reminder",
    text: message,
  };

  try {
    // Wtih SendGrid
    const response = await sendGrid.send(options);

    // With Nodemailer
    // const transporter = nodemailer.createTransport({
    //   service: emailService,
    //   auth: {
    //     user: emailUser,
    //     pass: emailPass,
    //   },
    // });
    // await transporter.sendMail(options);

    return { success: true, response };
  } catch (error) {
    return { success: false, error: error.message };
  }
});