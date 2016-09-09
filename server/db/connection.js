var pg = require('pg');

pg.defaults.password = '';
console.log('host',pg.defaults);
pg.defaults.host = "/var/run/postgresql";
var connectionString;

if (process.env.DATABASE_URL){
  pg.defaults.ssl = true;
  console.log('environment var');
  connectionString = process.env.DATABASE_URL;
} else {
  console.log('local var');
  connectionString = "postgres://localhost:5432/portfolio";
}

function initializeDB() {
  pg.connect(connectionString, function(err, client, done) {
    console.log('connected to postajsdnfowenfwql');

    if(err) {
      throw(err);
    }

    var query = client.query(
      `CREATE TABLE IF NOT EXISTS posts(
      id SERIAL PRIMARY KEY,
      date_added DATE NOT NULL,
      date_edited DATE,
      title TEXT NOT NULL,
      body TEXT NOT NULL
      );`);

    query.on('end', function() {
      console.log('post table okay');
      client.end();
    });

    query.on('err', function(err){
      console.log(err);
    });

  });
}



module.exports.connectionString = connectionString;
module.exports.initializeDB = initializeDB;
