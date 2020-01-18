const mode = process.env.MODE;
const configFile = require('./config.json')[mode];

console.log(mode);

module.exports = {
  db: {
    host: process.env.DB_HOST,                        //db host address
    username: process.env.DB_USERNAME,                //db username
    password: process.env.DB_PASSWORD,                //db password
    name: configFile.dbname                           //db name (differs depending on development & production)
  },
  reddit: {
    userAgent: process.env.REDDIT_USER_AGENT,         //reddit API user agent (see readme & snoowrap docs)
    clientId: process.env.REDDIT_CLIENT_ID,           //reddit API client id (see readme & snoowrap docs)
    clientSecret: process.env.REDDIT_CLIENT_SECRET,   //reddit API client secret (see readme & snoowrap docs)
    username: process.env.REDDIT_USERNAME,            //reddit API username (see readme & snoowrap docs)
    password: process.env.REDDIT_PASSWORD,            //reddit API password (see readme & snoowrap docs)
  },
  email: {
    user: process.env.EMAIL_USERNAME,                 //email SMTP username
    password: process.env.EMAIL_PASSWORD              //email SMTP password
  },
  session: {
    secret: process.env.SESSION_SECRET                //secret session key
  }
}
