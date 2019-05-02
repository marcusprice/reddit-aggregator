//options are 'development' & 'production'
const mode = 'development';

const credentials = require('./credentials');
const configFile = require('./config.json')[mode];

module.exports = {
  db: {
    host: credentials.db.host,
    username: credentials.db.username,
    password: credentials.db.password,
    name: configFile.dbname
  },
  reddit: {
    userAgent: credentials.reddit.userAgent,
    clientId: credentials.reddit.clientId,
    clientSecret: credentials.reddit.clientSecret,
    username: credentials.reddit.username,
    password: credentials.reddit.password,
  }
}
