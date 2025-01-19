# Birthday Notifcations

### What is the purpose of this app?

To send an email notification on your people's birthday!

### How does it work?

You created an account in order to access the dashboard. You can then create, edit, and delete birthday cards. On the day of the birthday, an email notification will be sent to you.

### What if I want to skip a birthday?

Clicking on the "Disable" button on the card will disable the email notification for that birthday.

### Can the app send a birthday text directly?

Not at the moment but future enhancements are in the works to send a birthday text directly instead of sending you a notification!

### What is tech stack?

This app was built with Vite (React) on the front, Firebase (Authentication, Document Database, File Storage, Serverless Functions) on the back, and SendGrid to send emails.

## Development

1. Clone repository
1. Create a Firebase project
1. Configure Firebase metadata in .env file
1. Set up a SendGrid account
1. Configure SendGrid metadata in ./functions/.env file

## Deployment

1. npm install -g firebase-tools
1. firebase login
1. firebase init hosting
1. npm run build
1. firebase deploy --only hosting
1. cd functions
1. firebase deploy --only functions
