// Set up
var express = require('express');
var app = express(); // create our app w/ express
var mongoose = require('mongoose'); // mongoose for mongodb
var morgan = require('morgan'); // log requests to the console (express4)
var bodyParser = require('body-parser'); // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var cors = require('cors');
var https = require('https');
const request = require('request');
const axios = require('axios');
var idsCompets = null;

// Configuration
mongoose.set('debug', true);
mongoose.connect('mongodb://localhost/ParisFoot');

app.use(morgan('dev')); // log every request to the console
app.use(bodyParser.urlencoded({
    'extended': 'true'
})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({
    type: 'application/vnd.api+json'
})); // parse application/vnd.api+json as json
app.use(methodOverride());
app.use(cors());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

var port = process.env.PORT || 8080; // set our port


// Models
var Schema = mongoose.Schema;
var reviewSchema = new Schema({
    titre: String,
    description: String,
    rating: Number
});

var fixtureSchema = new Schema({
    date: String,
    status: String,
    matchday: Number,
    homeTeamName: String,
    awayTeamName: String
}, {
    "strict": false
});

var teamSchema = new Schema({
    teamName: String,
    crestURI: String,
    position: Number
}, {
    "strict": false
});

var leagueTableSchema = new Schema({
    name: String,
    code: String,
    shortName: String
}, {
    "strict": false
});

var Review = mongoose.model('Review', reviewSchema);

var Competitions = mongoose.model('Competitions', new Schema({
    caption: String
}, {
    "strict": false
}));

var Fixtures = mongoose.model('Fixtures', fixtureSchema);
var Teams = mongoose.model('Teams', teamSchema);
var LeagueTable = mongoose.model('LeagueTable', leagueTableSchema);


// Routes

// middleware to use for all requests
app.use(function (req, res, next) {
    // do logging
    console.log('Executable avant chaque requete.');
    next(); // make sure we go to the next routes and don't stop here
});


app.get('/', function (req, res) {

    res.json({
        message: 'Yooo! welcome to ParisFoot !'
    });
});

// Get reviews
app.get('/api/reviews', function (req, res) {

    console.log("fetching reviews");

    // use mongoose to get all reviews in the database
    Review.find(function (err, reviews) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err)
            res.send(err)

        res.json(reviews); // return all reviews in JSON format
    });
});




// Get review by id 
app.get('/api/reviews/:id', function (req, res) {
    Review.findById(req.params.id, function (err, review) { // Review l 38 from mongoose
        if (err)
            res.send(err);
        res.json(review);
    });

})

// update  the review 
app.post('/api/reviews/:id', function (req, res) {

    Review.findById(req.params.id, function (err, review) {

        if (err)
            res.send(err);

        review.titre = req.body.title; // update the Review 
        review.description = req.body.description; // update the Review 
        review.rating = req.body.rating; // update the Review 
        // save the Review
        review.save(function (err) {
            if (err)
                res.send(err);

            res.json(review);
        });
    });
});


// create review and send back all reviews after creation
app.post('/api/reviews', function (req, res) {

    console.log("creating review");

    // create a review, information comes from request from Ionic
    Review.create({
        titre: req.body.title,
        description: req.body.description,
        rating: req.body.rating,
        done: false
    }, function (err, review) {
        if (err) {
            res.send(err);
        }
        // get and return all the reviews after you create another
        Review.find(function (err, reviews) {
            if (err)
                res.send(err)
            res.json(reviews);
        });
    });

});





// delete a review
app.delete('/api/reviews/:review_id', function (req, res) {
    Review.remove({
        _id: req.params.review_id
    }, function (err, review) {

        if (err)
            res.send(err);

        res.json({
            message: 'Successfully deleted'
        });

    });
});

//================= ParisFoot Traitement de donnees




// Pull competitions from api modify  the JSONS and push em in the mongo db
app.post('/api/updateAllCompetitionsToMongo', function (req, res) {
    axios.get('http://api.football-data.org/v1/competitions/?season=2017&X-Auth-Token=73d809746bd849fcb67e49ace137252a')
        .then(response => {
            res.json(response.data);
            console.log("data of all 2017 Competitions pulled from tha FootBall API ");
            for (i = 0; i < response.data.length; i++) {
                response.data[i].idCompet = response.data[i].id;
                response.data[i].picLink = "assets/img/imgCompetitions/" + response.data[i].id + ".jpg";
                Competitions.create(response.data[i], function (err, review) {
                    if (err) {
                        res.send(err);
                    }
                });
            }

        })
        .catch(error => {
            console.log(error);
        });
});



// Pull A competition fixtures from api modify  the JSONS and push em into the mongo db
app.post('/api/updateACompetitionFixturesToMongo', function (req, res) {
    console.log("data of 2017 Competitions's Fixtures pulled from tha FootBall API and pushed to Mongo ");
    axios.get('http://api.football-data.org/v1/competitions/?season=2017', {
        headers: {
            'X-Auth-Token': '73d809746bd849fcb67e49ace137252a'
        }
    }).then(responseCompet => {
            for (i = 0; i < responseCompet.data.length-1; i++) { //-1 cuz 466 compet's fixtures are restricted from API 
                    axios.get('http://api.football-data.org/v1/competitions/' + responseCompet.data[i].id + '/fixtures', {
                        headers: {
                            'X-Auth-Token': '73d809746bd849fcb67e49ace137252a'
                        }
                    }).then(function(results) {
                            for (j = 0; j < results.data.fixtures.length; j++) { 
                                // results.data.fixtures[j].HomeTeamLink = results.data.fixtures[j]._links.homeTeam.href;
                                // results.data.fixtures[j].picAwayTeamLink = results.data.fixtures[j]._links.awayTeam.href;
                                Fixtures.create(results.data.fixtures[j], function (err, fixture) {
                                    if (err) {
                                        res.send(err);
                                        console.log(err);
                                    }
                                });
                            }
                    }).catch(error => {
                        console.log(error);
                    });
            }
            console.log("YES");
        })
        .catch(error => {
            console.log(error);
        });
});



// Pull A competition teams from api modify the JSONS and push em into the mongo db
app.post('/api/updateACompetitionTeamsToMongo', function (req, res) {
    console.log("data of 2017 Competitions's Teams pulled from tha FootBall API and pushed to Mongo ");
    axios.get('http://api.football-data.org/v1/competitions/?season=2017', {
        headers: {
            'X-Auth-Token': '73d809746bd849fcb67e49ace137252a'
        }
    }).then(responseCompet => {
            for (i = 0; i < responseCompet.data.length-1; i++) { //-1 cuz 466 compet's fixtures are restricted from API 
                    axios.get('http://api.football-data.org/v1/competitions/' + responseCompet.data[i].id + '/teams', {
                        headers: {
                            'X-Auth-Token': '73d809746bd849fcb67e49ace137252a'
                        }
                    }).then(function(results) {
                            for (j = 0; j < results.data.teams.length; j++) { 
                                Teams.create(results.data.teams[j], function (err, team) {
                                    if (err) {
                                        res.send(err);
                                        console.log(err);
                                    }
                                });
                            }
                    }).catch(error => {
                        console.log(error);
                    });
            }
            console.log("YES");
        })
        .catch(error => {
            console.log(error);
        });
});




// Pull A competition LeagueTable from api modify the JSONS and push em into the mongo db
app.post('/api/updateACompetitionLeagueTableToMongo', function (req, res) {
    console.log("data of 2017 Competitions's League table pulled from tha FootBall API and pushed to Mongo ");
    axios.get('http://api.football-data.org/v1/competitions/?season=2017', {
        headers: {
            'X-Auth-Token': '73d809746bd849fcb67e49ace137252a'
        }
    }).then(responseCompet => {
            for (i = 0; i < responseCompet.data.length-1; i++) { //-1 cuz 466 compet's fixtures are restricted from API 
                    axios.get('http://api.football-data.org/v1/competitions/' + responseCompet.data[i].id + '/leagueTable', {
                        headers: {
                            'X-Auth-Token': '73d809746bd849fcb67e49ace137252a'
                        }
                    }).then(function(results) {
                            for (j = 0; j < results.data.standing.length; j++) { 
                                LeagueTable.create(results.data.standing[j], function (err, standing) {
                                    if (err) {
                                        res.send(err);
                                        console.log(err);
                                    }
                                });
                            }
                    }).catch(error => {
                        console.log(error);
                    });
            }
            console.log("YES");
        })
        .catch(error => {
            console.log(error);
        });
});


// Get competitions from Foot Mongo 
app.get('/api/allCompetitions', function (req, res) {
    Competitions.find(function (err, competitions) {
        if (err)
            res.send(err)
        res.json(competitions); // return all competitions in JSON format
    });
});



// listen (start app with node server.js) ======================================
app.listen(port);
console.log("App listening on port 8080");  