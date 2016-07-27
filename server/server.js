var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var port = process.env.PORT || 3000;

////////////import modules//////////
var index = require('./routes/index');
var blog = require('./routes/blog');
var admin = require('./routes/admin');


//////////// config /////////////
app.use(express.static('server/public'));
app.use(bodyParser.json());




///////////routes/////////////
app.use('/', index);
app.use('/blog', blog);
app.use('/admin', admin);












//listen
app.listen(port, function() {
  console.log('listening on port', port);
});
