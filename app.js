const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

const routes = require('./routes')(app);

app.listen(port, () => {
  console.log('express started');
});
