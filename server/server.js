
var express = require('express');
var bodyParser = require('body-parser');

var connectionString = require('./db/connection').connectionString;
var initializeDB = require('./db/connection').initializeDB;

var app = express();
var port = process.env.PORT || 3000;

////////////import modules//////////
var index = require('./routes/index');
var blog = require('./routes/blog');
var admin = require('./routes/admin');


//////////// config /////////////
app.use(express.static('server/public'));
app.use(bodyParser.json());
initializeDB();


/////////passpoooort//////////
var passport = require('passport');
var localStrategy = require('passport-local').Strategy; // username and password module
//var encryptLib = require('../modules/encryption');


///////////routes/////////////
app.use('/', index);
app.use('/blog', blog);
app.use('/admin', admin);


//////////// strategy /////////////
// passport.use('local', new localStrategy({passReqToCallback: true, usernameField: 'username'},
//   function(req, username, password, done) {
//       console.log('called local');
//         pg.connect(connectionString, function(err, client) {
//           console.log('called local - pg');
//
//           var user = {};
//
//             var query = client.query("SELECT * FROM users WHERE username = $1", [username]);
//
//             query.on('row', function(row) {
//               user = row;
//             });
//
//             // close connection after data get
//             query.on('end', function() {
//               if(!user.username) {
//                 done(null, false, {message: req.flash('Incorrect username')});
//
//               } else if(encryptLib.comparePassword(password, user.password)) {
//                 done(null, user);
//               } else {
//                 done(null, false, {message: req.flash('Incorrect username and password.')});
//               }
//               client.end();
//
//             });
//             //error handling
//             if(err){console.log(err);}
//         });
//   })); // end strategy def
//
//
// /////////////// serialization /////////////
// passport.serializeUser(function(user, done) {
//   done(null, user.id);
// });
//
// passport.deserializeUser(function(id, done) {
//   console.log('deserializing');
//   pg.connect(connectionString, function (err, client) {
//
//     var user = {};
//     console.log('deserializing - pg');
//      var query = client.query("SELECT * FROM users WHERE id = $1", [id]);
//
//      query.on('row', function(row) {
//        user = row;
//        done(null, user);
//      });
//
//      // closes connection after all data got
//      query.on('end', function() {
//        client.end();
//      });
//
//      // error handling
//      if(err) {console.log(err);}
//   });
// });


//listen
app.listen(port, function() {
  console.log('listening on port', port);
});
