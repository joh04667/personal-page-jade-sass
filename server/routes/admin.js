var router = require('express').Router();
var path = require('path');
var jade = require('jade');
var pg = require('pg');
var connectionString = require('../db/connection').connectionString;


router.get('/', function(req, res) {
  res.render('admin.jade', {title: 'Turn around',
                            test: '<h1>i am a sanitizer test pls ignore</h1>'});
});


router.get('/all', function(req, res) {
  pg.connect(connectionString, function(err, client, done) {
    var result = [];
    var query = client.query(`SELECT * FROM posts`);

    query.on('row', row => {result.push(row)});

    query.on('err', err => {throw(err)});

    query.on('end', function() {
      res.send(result);
      console.log('doop', result);
      done();
    });
  });

});

router.post('/new', function(req, res) {
  console.log(req, req.body);
  res.send('okay');
});


module.exports = router;
