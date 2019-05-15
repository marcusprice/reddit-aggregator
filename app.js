const config = require('./config/config');
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const bodyParser = require('body-parser');

app.use(bodyParser.json());

// if cors is enabled use it (developement only)
if(config.cors) {
  const cors = require('cors');
  app.use(cors());
}

const routes = require('./routes')(app);

app.listen(port, () => {
  console.log('express started');
});
