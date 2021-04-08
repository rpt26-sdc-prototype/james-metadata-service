const mysql = require('mysql');

let connection = mysql.createConnection({
  host: 'database',
  user: 'root',
  password: process.env.DB_PASS,
  database: 'fec_pathfinder_metadata'
});
console.log(process.env.DB_PASS);

connection.connect((err) => {
    if (err) {
      console.log('Error connecting to the database: ' + err.message);
    }
});



module.exports = connection;