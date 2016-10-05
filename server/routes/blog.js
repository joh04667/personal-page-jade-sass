var router = require('express').Router();
var path = require('path');
var jade = require('jade');
var pg = require('pg');
var connectionString = require('../db/connection.js').connectionString;
var util = require('../../modules/util');
var db = require('../../modules/Utilities/db');


router.get('/', function(request, res) {
     res.redirect('/blog/latest')
     // TODO: Make blog splash page or redirect to archive
});



// redirect to the latest blug post
router.get('/latest', function(req, res) {

  db.select(`SELECT MAX(id) FROM posts`, function(result) {
    res.redirect('/blog/' + result[0].max);
  });

});


// GET request for specific blog post
router.get('/:article', function(request, res) {

  db.select(`SELECT * FROM posts WHERE id = ${request.params.article}`, function(result) {
    // logic to link to other posts
    var low = request.params.article - 2;
    low = low < 1 ? 1 : low;
    var high = low + 4;

    db.select(`SELECT id FROM posts WHERE id BETWEEN ${low} AND ${high}`, function(pageRange) {

      // get just first result for post id. if no result, set false. Sort it numerically
      result = result.length ? result[0] : false;

      // my stupid function returns rows of object so map it then sort it
      var range = pageRange.map(s => s.id);
      range.sort((a,b) => a - b);

      // if no result found, 404 them.
      if(!result) {
        res.sendStatus(404);
      } else {
        res.render('blog.jade', {title: `Kyle Johnson\'s Blog #${request.params.article}`,
                                header: result.title,
                                postBody: result.body,
                                postDate: result.date_added,
                                range: range,
                                util: util,
                                article_id: request.params.article * 1});
      }
    });
  });
});



module.exports = router;
