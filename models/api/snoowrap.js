const config = require('../config/config.js');
const snoowrap = require('snoowrap');

const reddit = new snoowrap({
  userAgent: config.reddit.userAgent,
  clientId: config.reddit.clientId,
  clientSecret: config.reddit.clientSecret,
  username: config.reddit.username,
  password: config.reddit.password
});

module.exports = reddit;
