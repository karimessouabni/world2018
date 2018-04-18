"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const secureCompare = require("secure-compare");
// Take the text parameter passed to this HTTP endpoint and insert it into the
// Realtime Database under the path /messages/:pushId/original
exports.listener = functions.https.onRequest((req, res) => {
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
//# sourceMappingURL=index.js.map