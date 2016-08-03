var router = require('express').Router();
var path = require('path');
var jade = require('jade');
var pg = require('pg');
var connectionString = require('../db/connection.js').connectionString;


router.get('/', function(request, res) {
  res.render('blog.jade', {title: `Kyle Johnson's Blog`, range: [2,3,4,5]});
});

router.get('/:article', function(request, res) {
  pg.connect(connectionString, function(err, client, done) {
    var result = [];
    var range = [];
    var query = client.query(`SELECT * FROM posts WHERE id = ${request.params.article}`);
    query.on('row', row => {result.push(row)});
    query.on('err', err => {throw(err)});
    query.on('end', function() {

      var low = request.params.article - 2;
      low = low < 1 ? 1 : low;
      var high = low + 4;
      var query = client.query(`SELECT id FROM posts WHERE id BETWEEN ${low} AND ${high}`);

      query.on('row', row => {range.push(row.id)});
      query.on('end', function() {
        client.end();

        result = result.length ? result[0] : false;
        range = range.sort();
        if(!result) {
          res.sendStatus(404);
        } else {
          res.render('blog.jade', {title: 'Kyle Johnson\'s Blog #' + request.params.article,
                                  header: result.title,
                                  postBody: result.body,
                                  range: range});
        }
    });
    });
  });



});

module.exports = router;
