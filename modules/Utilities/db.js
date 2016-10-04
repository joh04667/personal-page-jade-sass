var db = {

  // Function to error handle and return SELECT statements with callback
  select: function(queryText, callback) {
    var result = [];
    var pg = require('pg');
    var connectionString = require('../../server/db/connection').connectionString;

    pg.connect(connectionString, function(err, client, done) {

        var query = client.query(queryText);

        query.on('row', row => {
            result.push(row)
        });
        query.on('err', err => {
            throw (err)
        });
        query.on('end', function() {
          done();
          callback(result);
        });
      })
  },

  // function to error handle INSERT statements with callback
  insert: function(queryText, data, callback) {
      var result = [];
      var pg = require('pg');
      var connectionString = require('../../server/db/connection').connectionString;

      pg.connect(connectionString, function(err, client, done) {

        var query = client.query(queryText, data);

        query.on('err', err => {
          callback(err);
        });

        query.on('end', function() {
          done();
          callback();
        });
      })
  }
}

module.exports = db;
