const config = require('../../config/config.js');
const { Pool } = require('pg');

const pool = new Pool({
  user: config.db.username,
  host: config.db.host,
  database: config.db.name,
  password: config.db.password,
  port: config.db.port
});

module.exports = pool;
