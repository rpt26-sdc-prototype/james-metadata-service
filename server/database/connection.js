const { Pool } = require('pg');

const pool = new Pool({
  database: 'sdc'
});

module.exports = pool;
