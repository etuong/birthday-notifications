const functions = require("firebase-functions");
const admin = require("firebase-admin");
const { onSchedule } = require("firebase-functions/v2/scheduler");
const nodemailer = require("nodemailer");
const sendGrid = require("@sendgrid/mail");
require('dotenv').config();

admin.initializeApp();
const db = admin.firestore();

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

const sendBirthdayEmails = async () => {
  const today = new Date();
  const month = today.getMonth() + 1; // Months are zero-based
  const day = today.getDate();

  try {
    const listAllUsers = async (nextPageToken) => {
      const listUsersResult = await admin.auth().listUsers(1000, nextPageToken);
      listUsersResult.users.forEach(async (userRecord) => {
        const usersSnapshot = await db.collection(userRecord.uid).get();
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
              to: userRecord.email,
              from: process.env.EMAIL_USER,
              subject: "Happy Birthday!",
              text,
            };
            await sendGrid.send(msg);
          }
        });
      });

      if (listUsersResult.pageToken) {
        await listAllUsers(listUsersResult.pageToken);
      }
    };

    await listAllUsers();
    return null;
  } catch (error) {
    console.error("Error sending birthday emails:", error);
    return null;
  }
};

exports.scheduleBirthdayEmails = onSchedule('every day 10:00', (async (event) => {
  return sendBirthdayEmails();
}));

exports.triggerBirthdayEmails = functions.https.onRequest(async (req, res) => {
  await sendBirthdayEmails();
  res.send("Birthday reminders sent.");
});