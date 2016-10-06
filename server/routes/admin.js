var router = require('express').Router();
var path = require('path');
var jade = require('jade');
var pg = require('pg');
var connectionString = require('../db/connection').connectionString;
var util = require('../../modules/util');
var db = require('../../modules/Utilities/db');


router.get('/', function(req, res) {

    db.select('SELECT * FROM posts ORDER BY id DESC', function(result) {
      res.render('admin.jade', {
                                title: 'Turn around',
                                posts: result,
                                util: util
                               });
    });

});


router.get('/all', function(req, res) {

    db.select('SELECT * FROM posts', function(result) {
      res.send(result);
    })

});

//TODO: finish implementing upload route
router.post('/upload', function(req, res) {
  console.log(req);
  console.log('files', req.files);
})


router.post('/new', function(req, res) {

  var data =  [new Date(), req.body.title, util.addPrettyClass(req.body.body)]

  db.insert(`INSERT INTO posts (date_added, title, body) VALUES ($1, $2, $3)`, data, function(err) {

    res.sendStatus(err ? 400 : 200);
  });

});



router.put('/edit/:article', function(req, res) {

    var data = [req.body.title, util.addPrettyClass(req.body.body), new Date()];

    var query = `UPDATE posts SET title= $1, body= $2, date_edited= $3 WHERE id= ${req.params.article}`;

    db.insert(query, data, function(err) {
      res.sendStatus(err ? 400 : 200);
    });

});


module.exports = router;
