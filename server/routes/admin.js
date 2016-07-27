var router = require('express').Router();
var path = require('path');
var jade = require('jade');

router.get('/', function(req, res) {
  res.render('admin.jade', {});

});





module.exports = router;
