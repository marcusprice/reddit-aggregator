const users = require('./controllers/users');

module.exports = (app) => {
  app.get('/', (req, res) => {
    res.send('public/index.html');
  });

  app.get('/api/v1/login', (req, res) => {
    new Promise((resolve, reject) => {
      users.verifyPassword(req.query.handle, req.query.password, (error, result) => {
        if(error) {
          reject(err);
        } else {
          if(result) {
            resolve();
          } else {
            reject('passwords didn\'t match')
          }
        }
      });
    })
    .then(() => {
      users.getAllData();
    })
    .catch((err) => {
      res.send(err);
    });
  });
}
