const functions = require("firebase-functions");
const admin = require("firebase-admin");
const { onSchedule } = require("firebase-functions/v2/scheduler");
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

exports.scheduleBirthdayEmails = onSchedule('every day 10:00', (async (event) => {
  const today = new Date();
  const month = today.getMonth() + 1; // Months are zero-based
  const day = today.getDate();

  try {
    const usersSnapshot = await db.collection('users').get();
    usersSnapshot.forEach(async (userDoc) => {
      const userData = userDoc.data();
      const userBirthDate = new Date(userData.birthDate.seconds * 1000);
      if (userBirthDate.getMonth() + 1 === month && userBirthDate.getDate() === day) {
        const text = `
      REMINDER: It's ${userData.name}'s birthday today! 🎉🎂
      Don't forget to wish them a happy birthday! 🎈🎁
      Phone: ${userData.phone}
      `;
        const msg = {
          to: userData.email,
          from: process.env.EMAIL_USER,
          subject: "Happy Birthday!",
          text,
        };
        await sendGrid.send(msg);
      }
    });
    return null;
  } catch (error) {
    console.error("Error sending birthday emails:", error);
    return null;
  }
}));
