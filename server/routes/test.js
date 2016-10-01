var router = require('express').Router();
var path = require('path');
var jade = require('jade');
var fs = require('fs');

router.get('/', function(request, res) {
  console.log('path', path.join(__dirname, '../public/images'));
  fs.readdir(path.join(__dirname, '../public/images'), function(err, imgs) {
    if (err) { throw err; }
    console.log('imgs', imgs);
    res.send(imgs);
  });
});




module.exports = router;
