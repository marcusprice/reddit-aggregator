const config = require('../config/config.js');
const { Client } = require('pg');

const client = new Client({
  user: config.db.username,
  host: config.db.host,
  database: config.db.name,
  password: config.db.password,
  port: config.db.port
});

client.connect();

module.exports = client;
