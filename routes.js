const users = require('./controllers/users');

module.exports = (app) => {
  app.get('/', (req, res) => {
    res.send('public/index.html');
  });

  //logs user on
  app.get('/api/v1/login', (req, res) => {
    //first check if password is correct
    new Promise((resolve, reject) => {
      users.verifyPassword(req.query.handle, req.query.password, (error, result) => {
        if(error) {
          //there was some kind of error
          reject(error);
        } else {
          if(result) {
            //password was correct
            resolve(req.query.handle);
          } else {
            //password was incorrect
            const error = new Error('password was incorrect');
            reject(error);
          }
        }
      });
    })
    .then((handle) => {
      //get the user's data (account info & reports)
      users.getAllData(handle, (err, result) => {
        if(err) {
          //there was some kind of error
          res.json(err);
        } else {
          //send results back to the client
          res.send(JSON.stringify(result, null, '\t'));
        }
      });
    })
    .catch((err) => {
      //send the error to the client
      res.send(500, err.toString());
    });
  });
}
