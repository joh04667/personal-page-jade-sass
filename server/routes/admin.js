var router = require('express').Router();
var path = require('path');
var jade = require('jade');
var pg = require('pg');
var connectionString = require('../db/connection').connectionString;
var util = require('../../modules/util');


router.get('/', function(req, res) {
    var result = [];

    pg.connect(connectionString, function(err, client, done) {

        var query = client.query(`SELECT * FROM posts ORDER BY id DESC`);

        query.on('row', row => {
            result.push(row)
        });
        query.on('err', err => {
            throw (err)
        });
        query.on('end', function() {
            done();
            res.render('admin.jade', {
                title: 'Turn around',
                posts: result,
                util: util
            });
        });
    });


});


router.get('/all', function(req, res) {
    pg.connect(connectionString, function(err, client, done) {

        var result = [];
        var query = client.query(`SELECT * FROM posts`);

        query.on('row', row => {
            result.push(row)
        });

        query.on('err', err => {
            throw (err);
        });

        query.on('end', function() {
            res.send(result);
            done();
        });

    });
});





router.post('/new', function(req, res) {

    pg.connect(connectionString, function(err, client, done) {

        var query = client.query(`INSERT INTO posts (date_added, title, body) VALUES ($1, $2, $3)`, [new Date(), req.body.title, util.addPrettyClass(req.body.body)]);

        query.on('err', err => {
            throw (err);
        });

        query.on('end', function() {
            res.sendStatus(200);
            done();
        });

    });
});


module.exports = router;
