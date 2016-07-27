var router = require('express').Router();
var path = require('path');
var jade = require('jade');

router.get('/', function(req, res) {
  res.render('admin.jade', {title: 'Turn around'});
});





module.exports = router;
