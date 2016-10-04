var router = require('express').Router();
var path = require('path');
var jade = require('jade');
var pg = require('pg');
var connectionString = require('../db/connection.js').connectionString;
var util = require('../../modules/util');


router.get('/', function(request, res) {
     res.redirect('/blog/1')
     // TODO: Make blog splash page or redirect to archive
});


// GET request for specific blog post
router.get('/:article', function(request, res) {
  // get post info from DB to template
  pg.connect(connectionString, function(err, client, done) {
    var result = [];
    var range = [];
    var query = client.query(`SELECT * FROM posts WHERE id = ${request.params.article}`);
    query.on('row', row => {result.push(row)});
    query.on('err', err => {throw(err)});
    query.on('end', function() {

      // logic to link to other posts
      var low = request.params.article - 2;
      low = low < 1 ? 1 : low;
      var high = low + 4;
      var query = client.query(`SELECT id FROM posts WHERE id BETWEEN ${low} AND ${high}`);

      query.on('row', row => {range.push(row.id)});
      query.on('end', function() {

        client.end();

        // get just first result for post id. if no result, set false. Sort it numerically
        result = result.length ? result[0] : false;
        range = range.sort((a,b) => a - b);
        // if no result found, 404 them.
        if(!result) {
          res.sendStatus(404);
        } else {

          res.render('blog.jade', {title: `Kyle Johnson\'s Blog #` + request.params.article,
                                  article_id: request.params.article,
                                  header: result.title,
                                  postBody: result.body,
                                  postDate: result.date_added,
                                  range: range,
                                  util: util,
                                  current: request.params.article * 1});
        }
    });
    });
  });



});

module.exports = router;
