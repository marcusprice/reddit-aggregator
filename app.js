require('dotenv').config()
const config = require('./config/config');
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const session = require('express-session');
const bodyParser = require('body-parser');

//sessions store loggedin, rememberme states & userid for 7 days
app.use(session({
  secret: config.session.secret,
  cookie: {
    expires: new Date(Date.now() + (1000 * 60 * 60 * 24 * 7)),
    secure: false
  },
  resave: true,
  saveUninitialized: true
}));

app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send('./public/index.html');
});

//routes (see routes dir)
require('./routes/authRoutes.js')(app);       //auth routes
require('./routes/reportRoutes.js')(app);     //report routes
require('./routes/subredditRoutes.js')(app);  //subreddit routes
require('./routes/userRoutes.js')(app);       //user routes

app.listen(port, () => {
  console.log('app running on port ' + port);
});
