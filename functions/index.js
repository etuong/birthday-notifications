const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");
require('dotenv').config();

admin.initializeApp();

// Email service credentials
const emailService = process.env.EMAIL_SERVICE;
const emailUser = process.env.EMAIL_USER;
const emailPass = process.env.EMAIL_PASS;

const transporter = nodemailer.createTransport({
  service: emailService,
  auth: {
    user: emailUser,
    pass: emailPass,
  },
});

exports.sendEmail = functions.https.onCall(async (data, context) => {
  // const { to, subject, text } = data;

  console.log("Email User:", emailUser);
  console.log("To:", "ethanator360@yahoo.com");
  console.log("Subject:", "Test Email");
  console.log("Text:", "This is a test email");

  if (!to || !subject || !text) {
    return { success: false, error: "Missing 'to', 'subject', or 'text' parameter" };
  }

  const mailOptions = {
    from: emailUser,
    to: to,
    subject: subject,
    text: text,
  };

  try {
    const response = await transporter.sendMail(mailOptions);
    return { success: true, response };
  } catch (error) {
    return { success: false, error: error.message };
  }
});