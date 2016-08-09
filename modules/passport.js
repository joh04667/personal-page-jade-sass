var passport = require('passport');


///////// OAUTH session starts ///////
passport.use('local', new localStrategy({passReqToCallback: true, usernameField: 'username'},
  function(req, username, password, done) {
      console.log('called local');
        pg.connect(connectionString, function(err, client) {
          console.log('called local - pg');

          var user = {};

            var query = client.query("SELECT * FROM users WHERE username = $1", [username]);

            query.on('row', function(row) {
              user = row;
            });

            // close connection after data get
            query.on('end', function() {
              if(!user.username) {
                done(null, false, {message: req.flash('Incorrect username')});

              } else if(encryptLib.comparePassword(password, user.password)) {
                done(null, user);
              } else {
                done(null, false, {message: req.flash('Incorrect username and password.')});
              }
              client.end();

            });
            //error handling
            if(err){console.log(err);}
        });



  })); // end strategy def




module.exports = name;
