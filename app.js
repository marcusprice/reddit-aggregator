const config = require('./config/config');
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

app.use(session({
  secret: config.session.secret,
  cookie: {
    maxAge: 60000,
    secure: false,
    domain: 'localhost:3000'
  },
  resave: true,
  saveUninitialized: true
}));

app.use(cookieParser(config.session.secret));
app.use(bodyParser.json());
app.use(express.static('public'));

// if cors is enabled use it (developement only)
if(config.cors) {
  const cors = require('cors');
  app.use(cors());
}

const routes = require('./routes')(app);

app.listen(port, () => {
  console.log('express started');
});
