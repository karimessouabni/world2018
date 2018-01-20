"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");
const secureCompare = require("secure-compare");
admin.initializeApp(functions.config().firebase);
// Take the text parameter passed to this HTTP endpoint and insert it into the
// Realtime Database under the path /messages/:pushId/original
exports.addMessage = functions.https.onRequest((req, res) => {
    // Grab the text parameter.
    const key = req.query.key;
    const original = req.query.text;
    // Push the new message into the Realtime Database using the Firebase Admin SDK.
    if (!secureCompare(key, functions.config().cron.key)) {
        console.log('The key provided in the request does not match the key set in the environment. Check that', key, 'matches the cron.key attribute in `firebase env:get`');
        res.status(403).send('Security key does not match. Make sure your "key" URL query parameter matches the ' +
            'cron.key environment variable.');
        return;
    }
    admin.firestore().collection('messagesFunctionwitCronTest').add({ original: original }).then(ref => {
        // Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
        console.log('Added document with ID: ', ref.id);
        res.send('User cleanup finished');
    }).catch(error => {
        console.log(error);
    });
});
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
// Sends a welcome email to the given user.
function sendWelcomeEmail(email, displayName) {
    const mailOptions = {
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
    const mailOptions = {
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
//# sourceMappingURL=index.js.map