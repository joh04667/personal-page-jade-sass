var router = require('express').Router();
var path = require('path');
var jade = require('jade');

router.get('/', function(req, res) {
  res.render('admin.jade', {title: 'Turn around',
                            test: '<h1>i am a sanitizer test pls ignore</h1>'});
});


router.post('/new', function(req, res) {
  console.log(req, req.body);
  res.send('okay');
});


module.exports = router;
