const { Pool } = require('pg');
// const config = require('../../config.js');


// let connection = mysql.createConnection({
  //   host: process.env.DB_HOST || 'localhost',
  //   user: process.env.DB_USER || 'root',
  //   password: process.env.DB_PASS || config.PASSWORD,
  //   database: process.env.DB_NAME || 'fec_pathfinder_metadata'
  // });

  const pool = new Pool({
    database: 'sdc'
    // user: '?',
    // password: '?',
    // port:
  });

// pool.connect((err) => {
//     if (err) {
//       console.log('Error connecting to the database: ' + err.message);
//     }
// });

module.exports = pool;
