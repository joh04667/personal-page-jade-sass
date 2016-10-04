var router = require('express').Router();
var path = require('path');
var jade = require('jade');
var pg = require('pg');
var connectionString = require('../db/connection').connectionString;
var util = require('../../modules/util');
var cheerio = require('cheerio');

router.get('/', function(req, res) {
  var result = [];

  pg.connect(connectionString, function(err, client, done) {

    var query = client.query(`SELECT * FROM posts ORDER BY id DESC`);

    query.on('row', row => {result.push(row)});
    query.on('err', err => {throw(err)});
    query.on('end', function() {
      done();
      res.render('admin.jade', {title: 'Turn around',
                                posts: result,
                                prettyDate: util.prettyDate});
    });
  });


});


router.get('/all', function(req, res) {
  pg.connect(connectionString, function(err, client, done) {

    var result = [];
    var query = client.query(`SELECT * FROM posts`);

    query.on('row', row => {result.push(row)});

    query.on('err', err => {
      throw(err);
    });

    query.on('end', function() {
      res.send(result);
      done();
    });

  });
});




router.post('/new', function(req, res) {
  // use Cheerio to load the body html.
  var $ = cheerio.load(req.body.body);
  // Use cheerio's jQuery methods to add 'prettyprint' class to code fields so Prettify has something to latch on to
  // This has to be done serverside as Trix will not allow attribute editing. It is self-contained rich text that rewrites on change
  // either that or I just can't figure it out, idk
    $('pre').addClass('prettyprint');
  // store new body with 'prettyprint' tags added in variable
  var postBody = $.html();


  pg.connect(connectionString, function(err, client, done) {

    var query = client.query(`INSERT INTO posts (date_added, title, body) VALUES ($1, $2, $3)`, [new Date(), req.body.title, postBody]);

    query.on('err', err => {
      throw(err);
    });

    query.on('end', function() {
      res.sendStatus(200);
      done();
    });

  });
});


module.exports = router;
