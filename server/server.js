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
const moment = require('moment');
const admin = require('firebase-admin');
var idsCompets = null;
//Firebase


var serviceAccount = require('./FBLoginParisFoot-8c9ef1552e11.json');
//import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';


// Configuration
mongoose.set('debug', true);
mongoose.connect('mongodb://188.166.174.3/ParisFoot');

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
  matchday: String
}, {
  "strict": false
});


var worldCupTableSchema = new Schema({
  leagueCaption: String,
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
var WCTable = mongoose.model('WCTable', worldCupTableSchema);



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





// WorldCup management

app.post('/api/worldCupCompetitions', function (req, res) {
  axios.get('http://api.football-data.org/v1/competitions/467/?X-Auth-Token=73d809746bd849fcb67e49ace137252a')
    .then(response => {
      res.json(response.data);

      response.data.idCompet = response.data.id;
      response.data.picLink = "assets/img/imgCompetitions/" + response.data.id + ".jpg";
      Competitions.create(response.data, function (err, review) {
        if (err) {
          res.send(err);
        }
      });


    })
    .catch(error => {
      console.log(error);
    });
});


app.post('/api/worldCupFixturesToMongo', function (req, res) {
  axios.get('http://api.football-data.org/v1/competitions/467/fixtures?X-Auth-Token=73d809746bd849fcb67e49ace137252a')
    .then(results => {
      for (j = 0; j < results.data.fixtures.length; j++) {
        var indexIdHomeTeam = results.data.fixtures[j]._links.homeTeam.href.lastIndexOf("/");
        var indexIdAwayTeam = results.data.fixtures[j]._links.awayTeam.href.lastIndexOf("/");

        results.data.fixtures[j].idHomeTeam = results.data.fixtures[j]._links.homeTeam.href.substring(indexIdHomeTeam + 1, results.data.fixtures[j]._links.homeTeam.href.length);
        results.data.fixtures[j].idAwayTeam = results.data.fixtures[j]._links.awayTeam.href.substring(indexIdAwayTeam + 1, results.data.fixtures[j]._links.awayTeam.href.length);
        Fixtures.create(results.data.fixtures[j], function (err, fixture) {
          if (err) {
            res.send(err);
            console.log(err);
          }
        });
      }
      res.json("Done");
    }).catch(error => {
      console.log(error);
    });
});


app.post('/api/worldCupTeamsToMongo', function (req, res) {
  axios.get('http://api.football-data.org/v1/competitions/467/teams?X-Auth-Token=73d809746bd849fcb67e49ace137252a')
    .then(results => {
      for (j = 0; j < results.data.teams.length; j++) {
        var indexIdTeam = results.data.teams[j]._links.self.href.lastIndexOf("/");

        results.data.teams[j].idTeam = results.data.teams[j]._links.self.href.substring(indexIdTeam + 1, results.data.teams[j]._links.self.href.length);

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
  res.json("Done");
});

app.post('/api/worldCupTableToMongo', function (req, res) {
  axios.get('http://api.football-data.org/v1/competitions/467/leagueTable?X-Auth-Token=73d809746bd849fcb67e49ace137252a')
    .then(results => {

      WCTable.create(results.data, function (err, team) {
        if (err) {
          res.send(err);
          console.log(err);
        }
      });
    }).catch(error => {
      console.log(error);
    });
  res.json("Done");

});

app.post('/api/worldCupTableUpdateGroupTeams', function (req, res) {
  axios.get('http://api.football-data.org/v1/competitions/467/leagueTable?X-Auth-Token=73d809746bd849fcb67e49ace137252a')
    .then(results => {
      let groupResult = results.data.standings.A;
      for (j = 0; j < 8; j++) {
        switch (j) {
          case 0:
            groupResult = results.data.standings.A;
            break;
          case 1:
            groupResult = results.data.standings.B;
            break;
          case 2:
            groupResult = results.data.standings.C;
            break;
          case 3:
            groupResult = results.data.standings.D;
            break;
          case 4:
            groupResult = results.data.standings.E;
            break;
          case 5:
            groupResult = results.data.standings.F;
            break;
          case 6:
            groupResult = results.data.standings.G;
            break;
          case 7:
            groupResult = results.data.standings.H;
            break;

          default:
            break;
        }

// Create the 8 table in WcTable
        WCTable.create(groupResult, function (err, team) {
          if (err) {
            res.send(err);
            console.log(err);
          }
        });
// Create the 8 table in WcTable  

        for (i = 0; i < 4; i++) {
          let teamId = groupResult[i].teamId;
          let group = groupResult[i].group;
          var regex = new RegExp(teamId, "i");

          Teams.findOneAndUpdate({
            'idTeam': `${teamId}`
          }, {
            'group': group
          }, function (err, team) {
            if (err) return handleError(err);
          });

        }
      }
    }).catch(error => {
      console.log(error);
    });
  res.json("Done");

});

/* Get Table of certain group */
app.get('/api/WCTable/:d', function (req, res) {

    WCTable.find({'group': `${req.params.d}`}, function (err, fixtures) {
    if (err) {
      res.json(err);
    }
    res.json(fixtures);
  });

});

/* Get Team by it's Name */
app.get('/api/WCTeam/:d', function (req, res) {

  WCTable.find({'name': `${req.params.d}`}, function (err, fixtures) {
  if (err) {
    res.json(err);
  }
  res.json(fixtures);
});

});



//=================


// Pull competitions from api modify  the JSONS and push em in the mongo db
app.post('/api/updateAllCompetitionsToMongo', function (req, res) {
  Competitions.remove({}, function (err) {
    if (err) {
      console.log("Removing all Competition documents failed" + err);
    } else {
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
    }
  });
});




// Pull A competition fixtures from api modify  the JSONS and push em into the mongo db
app.post('/api/updateACompetitionFixturesToMongo', function (req, res) {

  Fixtures.remove({}, function (err) {
    if (err) {
      console.log("Removing all Fixtures documents failed" + err);
    } else {
      console.log("data of 2017 Competitions's Fixtures pulled from tha FootBall API and pushed to Mongo ");
      axios.get('http://api.football-data.org/v1/competitions/?season=2017', {
          headers: {
            'X-Auth-Token': '73d809746bd849fcb67e49ace137252a'
          }
        }).then(responseCompet => {
          for (i = 0; i < responseCompet.data.length - 1; i++) { //-1 cuz 466 compet's fixtures are restricted from API 
            axios.get('http://api.football-data.org/v1/competitions/' + responseCompet.data[i].id + '/fixtures', {
              headers: {
                'X-Auth-Token': '73d809746bd849fcb67e49ace137252a'
              }
            }).then(function (results) {
              for (j = 0; j < results.data.fixtures.length; j++) {
                var indexIdHomeTeam = results.data.fixtures[j]._links.homeTeam.href.lastIndexOf("/");
                var indexIdAwayTeam = results.data.fixtures[j]._links.awayTeam.href.lastIndexOf("/");

                results.data.fixtures[j].idHomeTeam = results.data.fixtures[j]._links.homeTeam.href.substring(indexIdHomeTeam + 1, results.data.fixtures[j]._links.homeTeam.href.length);
                results.data.fixtures[j].idAwayTeam = results.data.fixtures[j]._links.awayTeam.href.substring(indexIdAwayTeam + 1, results.data.fixtures[j]._links.awayTeam.href.length);
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
    }
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
      for (i = 0; i < responseCompet.data.length - 1; i++) { //-1 cuz 466 compet's fixtures are restricted from API 
        axios.get('http://api.football-data.org/v1/competitions/' + responseCompet.data[i].id + '/teams', {
          headers: {
            'X-Auth-Token': '73d809746bd849fcb67e49ace137252a'
          }
        }).then(function (results) {
          for (j = 0; j < results.data.teams.length; j++) {
            var indexIdTeam = results.data.teams[j]._links.self.href.lastIndexOf("/");

            results.data.teams[j].idTeam = results.data.teams[j]._links.self.href.substring(indexIdTeam + 1, results.data.teams[j]._links.self.href.length);

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
      for (i = 0; i < responseCompet.data.length - 1; i++) { //-1 cuz 466 compet's fixtures are restricted from API 
        axios.get('http://api.football-data.org/v1/competitions/' + responseCompet.data[i].id + '/leagueTable', {
          headers: {
            'X-Auth-Token': '73d809746bd849fcb67e49ace137252a'
          }
        }).then(function (results) {
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




//========================== Filters ========================//

// Get all fixtures of Day d 
app.get('/api/fixtures/:d', function (req, res) {

  var regex = new RegExp(req.params.d, "i"),
    query = {
      'date': regex
    };

  Fixtures.find(query, function (err, fixtures) {
    if (err) {
      res.json(err);
    }
    res.json(fixtures);
  });

});

getFixtureByDate = (date) => {
  query = {
    'date': date
  };

  Fixtures.find(query, function (err, fixtures) {
    return (err) ? err : fixtures;
  });
  //call ==>  return getFixtureByDate(regexToday).then( resultat => res.json(resultatres)); // to try first 

}

// Find A team by it's id 
app.get('/api/team/:id', function (req, res) {
  var query = {
    'idTeam': req.params.id
  };

  Teams.find(query, function (err, fixtures) {
    if (err) {
      res.json(err);
    }
    res.json(fixtures[0]);

  });
});

// Get all fixtures of a competitions a Day d 
app.get('/api/fixtures/:d/:competName?', function (req, res) {
  var idCompet = null;

  switch (req.params.competName) {

    case "BSA": //444
      idCompet = 444;
      break;
    case "DED": //449
      idCompet = 449;
      break;
    case "PD": //455
      idCompet = 455;
      break;
    case "CL": //464
      idCompet = 464;
      break;
    case "ELC": //446
      idCompet = 446;
      break;
    case "EL1": //552
      idCompet = 552;
      break;
    case "PL": //445
      idCompet = 445;
      break;
    case "EL2": //448
      idCompet = 448;
      break;
    case "BL1": //452
      idCompet = 452;
      break;
    case "DFB": //458
      idCompet = 458;
      break;
    case "FL2": //451
      idCompet = 451;
      break;
    case "PPL": //457
      idCompet = 457;
      break;
    case "BL2": //306
      idCompet = 306;
      break;
    case "SB": //462
      idCompet = 462;
      break;
    case "FL1": //450
      idCompet = 450;
      break;
    case "SA": //456
      idCompet = 456;
      break;
    case "AAL": //466
      idCompet = 466;
      break;
    case "WC": //466
      idCompet = 467;
      break;
    default:
      idCompet = 464;
  }

  var regexDay = new RegExp(req.params.d, "i"),
    regexCompetName = new RegExp(idCompet)

    ,
    query = {
      $and: [{
        'date': regexDay
      }, {
        '_links.competition.href': regexCompetName
      }]
    };

  Fixtures.find(query, function (err, fixtures) {
    if (err) {
      res.json(err);
    }
    console.log("requete Mongo par compet et date Len = " + fixtures.length);
    res.json(fixtures);
  });

});


// Solution 

app.post('/api/updateSolutionBet3Sheets', function (req, res) {

  const today = moment().format('YYYY[-]MM[-]DD');
  const regexToday = new RegExp(today, "i"),

    query = {
      $and: [{
        'date': regexToday
      }, {
        'status': 'FINISHED'
      }]
    };

  Fixtures.find(query, function (err, finishedTodatFixtures) {
    if (err) {
      res.json(err);
    }
    // creer SolutionBet3Sheets from finished fixtures of today
    finishedTodatFixtures.forEach(fixture => {

    })

    res.json(finishedTodatFixtures);
  });


});


// Delet all fixtures of today or a given date from Mongo and update em from FBAPI 
//example : http://karim.local:8080/api/deleteTodayFixtures/2018-04-20/p1

app.put('/api/deleteTodayFixtures/:date*?/:pn*?', (req, res) => {

  // deleting from mongo 
  const regexToday = (req.params.date) ? new RegExp(req.params.date, "i") : new RegExp(moment().subtract(2, 'hour').format('YYYY[-]MM[-]DD'), "i");
  const pn = (req.params.pn) ? req.params.pn : 'n1';

  Fixtures.remove({
    'date': regexToday
  }, function (err, review) {
    if (err)
      res.send(`error on deleting fixture of day : ${regexToday} : ${err}`);
    else {
      axios.get('http://api.football-data.org/v1/fixtures?timeFrame=' + pn + '', {
        headers: {
          'X-Auth-Token': '73d809746bd849fcb67e49ace137252a'
        }
      }).then(todayFixturesUpdated => {
        for (let j = 0; j < todayFixturesUpdated.data.fixtures.length; j++) {
          var indexIdHomeTeam = todayFixturesUpdated.data.fixtures[j]._links.homeTeam.href.lastIndexOf("/");
          var indexIdAwayTeam = todayFixturesUpdated.data.fixtures[j]._links.awayTeam.href.lastIndexOf("/");

          todayFixturesUpdated.data.fixtures[j].idHomeTeam = todayFixturesUpdated.data.fixtures[j]._links.homeTeam.href.substring(indexIdHomeTeam + 1, todayFixturesUpdated.data.fixtures[j]._links.homeTeam.href.length);
          todayFixturesUpdated.data.fixtures[j].idAwayTeam = todayFixturesUpdated.data.fixtures[j]._links.awayTeam.href.substring(indexIdAwayTeam + 1, todayFixturesUpdated.data.fixtures[j]._links.awayTeam.href.length);
          Fixtures.create(todayFixturesUpdated.data.fixtures[j], function (err, fixture) {
            if (err) {
              res.send(err);
              console.log(err);
            }
          });
        }
        res.json({
          message: `All fixtures of : ${regexToday} are Successfully updated`
        });
      }).catch(error => {
        console.log(error);
      });
    }

  });
});







// =============== FireBase




// Get competitions from Foot Mongo 
app.get('/firebase/gameResultCalculate', function (req, res) {

  // const today = moment().subtract(2, 'hour').format('YYYY[-]MM[-]DD');
  // var regex = new RegExp(req.params.d, "i"),
  const today = new RegExp(moment().subtract(2, 'month').format('YYYY[-]MM[-]DD'), "i");
  // const today = new RegExp (moment().subtract(1, 'month').format('YYYY[-]MM[-]DD'),;

  Fixtures.find({
    'date': today
  }).where('status').equals('FINISHED').select('_id').exec(function (err, fixtures) { // a ajouter que le matche soit tertminé 
    if (err) {
      res.json(err);
    }

    var games = [];
    fixtures.forEach(fixture => {




      // get game from firestore PB with subcollection 
      // fixturesid = "5ad72f61ddd31d07bc57c61f";
      // db.collection('games').where('idFixture', '==', fixturesid)
      //   .get()
      //   .then(function (gamesForThisFixture) {


      //     gamesForThisFixture.forEach( (game) => {
      //       games.push(game.data());
      //     });

      //   });

    });



    res.json(games);
  });


  // Fixtures.find({}).where('date').gt(regexToday).exec(function(err, users) {
  //   if (err) throw err;

  //   // show the admins in the past month
  //   console.log(users);
  // });



});

// ============== FireBase


// app.get('/api/deleteTodayFixtures', (req, res) => {

//   const regexToday = new RegExp(moment().subtract(2, 'hour').format('YYYY[-]MM[-]DD'), "i");
//   const pn =  'n1';


//   User.find({}).where('date').gt(regexToday).exec(function(err, users) {
//     if (err) throw err;

//     // show the admins in the past month
//     console.log(users);
//   });


// Fixtures.find
//     axios.get('http://api.football-data.org/v1/fixtures?timeFrame=' + pn + '', {
//       headers: {
//         'X-Auth-Token': '73d809746bd849fcb67e49ace137252a'
//       }
//     }).then(todayFixturesUpdated => {
//       for (let j = 0; j < todayFixturesUpdated.data.fixtures.length; j++) {


//         const idFixture = todayFixturesUpdated.data.fixtures[j]._id;


//       }
//       res.json({
//         message: `All games  of : ${regexToday} are Successfully vzlculated`
//       });
//     }).catch(error => {
//       console.log(error);
//     });
//   }
// });

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
var db = admin.firestore();




//Firebase

// listen (start app with node server.js) ======================================
app.listen(port);
console.log("App listening on port 8080");
