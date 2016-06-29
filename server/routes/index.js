var router = require('express').Router();
var path = require('path');
var jade = require('jade');




router.get('/', function(request, res) {
  res.render('layout.jade', {title: 'MyApp', body: 'main.jade'});
});




module.exports = router;
