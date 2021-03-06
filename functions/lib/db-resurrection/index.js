"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const axios_1 = require("axios");
const request = require('request');
const express = require('express');
const cors = require('cors');
const Client = require('node-rest-client').Client;
const client = new Client();
const app = express();
app.use(cors({ origin: true }));
exports.bdResurrection = functions.https.onRequest((req, res) => {
    axios_1.default.get('http://api.football-data.org/v1/competitions/?season=2017&X-Auth-Token=73d809746bd849fcb67e49ace137252a')
        .then(response => {
        response.data.forEach(competition => {
            competition.picLink = "assets/img/imgCompetitions/" + competition.id + ".jpg";
            admin.firestore().collection('Competitions').add(competition)
                .catch(error => {
                console.log(error);
            });
        });
        console.log('finished');
        res.send('finished' + response);
    }).catch(error => {
        res.send('error on getAllCompetition  => ' + error);
    });
});
exports.fixturesResurrection = functions.https.onRequest((req, res) => {
    console.log("data of 2017 Competitions's Fixtures pulled from tha FootBall API and pushed to FireStore ");
    let numberCompet = 455;
    // for (let i = 0; i < 5; i++) {
    client.get('http://api.football-data.org/v1/competitions/' + numberCompet + '/fixtures', function (data, response) {
        console.log(data.fixtures.length);
        data.fixtures.forEach(fixture => {
            admin.firestore().collection('Fixtures').add(fixture)
                .catch(error => {
                console.log(error);
            }).then(() => {
                console.log(1);
                return res.status(200)
                    .type('application/json')
                    .send(fixture);
            });
        });
    });
    // numberCompet++;
    // }
});
//# sourceMappingURL=index.js.map