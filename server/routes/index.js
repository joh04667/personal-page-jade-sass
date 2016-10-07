var router = require('express').Router();
var path = require('path');
var jade = require('jade');



var blog = require('./blog');
var admin = require('./admin');
var test = require('./test')





router.get('/', function(request, res) {
  res.render('layout.jade', {title: 'Kyle Johnson: Full-Stack Developer'});
});

router.use('/blog', blog);
router.use('/admin', admin);
router.use('/test', test);



module.exports = router;
