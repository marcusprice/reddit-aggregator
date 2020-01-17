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
    expires: new Date(Date.now() + (7 * 86400 * 1000)),
    secure: false
  },
  resave: true,
  saveUninitialized: true
}));

app.use(cookieParser(config.session.secret));
app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send('./public/index.html');
});

//routes
const authRoutes = require('./routes/authRoutes.js')(app);
const reportRoutes = require('./routes/reportRoutes.js')(app);
const subredditRoutes = require('./routes/subredditRoutes.js')(app);
const userRoutes = require('./routes/userRoutes.js')(app);

app.listen(port, () => {
  console.log('express started');
});
