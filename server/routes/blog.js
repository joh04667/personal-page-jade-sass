var router = require('express').Router();
var path = require('path');
var jade = require('jade');



router.get('/', function(request, res) {
  res.render('blog.jade', {title: 'Kyle Johnson\'s Blog'});
});

router.get('/:article', function(request, res) {
  res.render('blog.jade', {title: 'Kyle Johnson\'s Blog #' + request.params.article,
                           header: 'one post',
                           postBody: 'lorem ipsum'});
});

module.exports = router;
