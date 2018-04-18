import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as nodemailer from 'nodemailer';
import * as AddMessage from './add-message';
import * as dbParisFoot from './db-resurrection';



admin.initializeApp(functions.config().firebase);
export const addMessage = AddMessage.listener;
export const bdResurrection = dbParisFoot.bdResurrection;
export const fixturesResurrection = dbParisFoot.fixturesResurrection;


// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.


// The Firebase Admin SDK to access the Firebase Realtime Database. 

// Configure the email transport using the default SMTP transport and a GMail account.
// For Gmail, enable these:
// 1. https://www.google.com/settings/security/lesssecureapps
// 2. https://accounts.google.com/DisplayUnlockCaptcha
// For other types of transports such as Sendgrid see https://nodemailer.com/transports/
// TODO: Configure the `gmail.email` and `gmail.password` Google Cloud environment variables.
const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;
const mailTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: gmailEmail,
    pass: gmailPassword
  }
});

// Your company name to include in the emails
// TODO: Change this to your app or company name to customize the email sent.
const APP_NAME = 'ParisFoot';

// [START sendWelcomeEmail]
/**
 * Sends a welcome email to new user.
 */
// [START onCreateTrigger]
exports.sendWelcomeEmail = functions.auth.user().onCreate(event => {
  // [END onCreateTrigger]
  // [START eventAttributes]
  const user = event.data; // The Firebase user.

  const email = user.email; // The email of the user.
  const displayName = user.displayName; // The display name of the user.
  // [END eventAttributes]

  return sendWelcomeEmail(email, displayName);
});
// [END sendWelcomeEmail]

// [START sendByeEmail]
/**
 * Send an account deleted email confirmation to users who delete their accounts.
 */
// [START onDeleteTrigger]
exports.sendByeEmail = functions.auth.user().onDelete(event => {
  // [END onDeleteTrigger]
  const user = event.data;

  const email = user.email;
  const displayName = user.displayName;

  return sendGoodbyEmail(email, displayName);
});
// [END sendByeEmail]

export interface mail {
  from: string,
  to: string,
  subject: string,
  text: string,
}
// Sends a welcome email to the given user.
function sendWelcomeEmail(email, displayName) {
  const mailOptions: mail = {
    from: `${APP_NAME} <noreply@firebase.com>`,
    to: email,
    subject: `Welcome to ${APP_NAME}!`,
    text: `Hey ${displayName || ''}! Welcome to ${APP_NAME}. I hope you will enjoy our service.`,
  };

  // The user subscribed to the newsletter.
  mailOptions.subject = `Welcome to ${APP_NAME}!`;
  mailOptions.text = `Hey ${displayName || ''}! Welcome to ${APP_NAME}. I hope you will enjoy our service.`;
  return mailTransport.sendMail(mailOptions).then(() => {
    console.log('New welcome email sent to:', email);
  });
}

// Sends a goodbye email to the given user.
function sendGoodbyEmail(email, displayName) {
  const mailOptions: mail = {
    from: `${APP_NAME} <noreply@firebase.com>`,
    to: email,
    subject: `Bye!`,
    text: `Hey ${displayName || ''}!, We confirm that we have deleted your ${APP_NAME} account.`,
  };

  // The user unsubscribed to the newsletter.

  return mailTransport.sendMail(mailOptions).then(() => {
    console.log('Account deletion confirmation email sent to:', email);
  });
}
