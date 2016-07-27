var router = require('express').Router();
var path = require('path');
var jade = require('jade');
var pg = require('pg');
var connectionString = require('../db/connection.js').connectionString;


router.get('/', function(request, res) {
  res.render('blog.jade', {title: 'Kyle Johnson\'s Blog'});
});

router.get('/:article', function(request, res) {
  pg.connect(connectionString, function(err, client, done) {
    var result = [];
    var query = client.query(`SELECT * FROM posts WHERE id = ${request.params.article}`);
    query.on('row', row => {result.push(row)});
    query.on('err', err => {throw(err)});
    query.on('end', function() {
      done();
      result = result.length ? result[0] : false;
      if(!result) {
        res.sendStatus(404);
      } else {
      res.render('blog.jade', {title: 'Kyle Johnson\'s Blog #' + request.params.article,
                               header: result.title,
                               postBody: result.body});
      }
    });
  });



});

module.exports = router;
