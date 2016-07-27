var router = require('express').Router();
var path = require('path');
var jade = require('jade');

router.get('/', function(req, res) {
  res.render('admin.jade', {title: 'Turn around',
                            test: '<h1>i am a sanitizer test pls ignore</h1>'});
});





module.exports = router;
