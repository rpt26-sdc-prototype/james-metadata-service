const { Pool } = require('pg');
const config = require('../../config.js');

const pool = new Pool({
  USER: 'ubuntu',
  HOST: 'ec2-18-191-106-39.us-east-2.compute.amazonaws.com',
  PASSWORD: 'password',
  DATABASE: 'postgres',
  PORT: 5432
});

module.exports = pool;
