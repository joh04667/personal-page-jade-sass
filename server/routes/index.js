var router = require('express').Router();
var path = require('path');
var jade = require('jade');




router.get('/', function(request, res) {
  console.log('gottam')
  res.render('layout.jade', {title: 'Kyle Johnson: Full-Stack Developer', body: 'main.jade'});
});




module.exports = router;
