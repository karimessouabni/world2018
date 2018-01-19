"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);
// Take the text parameter passed to this HTTP endpoint and insert it into the
// Realtime Database under the path /messages/:pushId/original
exports.addMessage = functions.https.onRequest((req, res) => {
    // Grab the text parameter.
    const original = req.query.text;
    // Push the new message into the Realtime Database using the Firebase Admin SDK.
    admin.firestore().collection('messagesFunctionTest').add({ original: original }).then(ref => {
        // Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
        console.log('Added document with ID: ', ref.id);
    }).catch(error => {
        console.log(error);
    });
});
// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
// The Firebase Admin SDK to access the Firebase Realtime Database. 
//# sourceMappingURL=index.js.map