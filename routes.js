const users = require('./controllers/users');
const tools = require('./lib/tools');
const helpers = require('./lib/helpers');

module.exports = (app) => {
  //logs user on, gets all the data etc.
  let output = {};
  app.get('/api/v1/checkLoginStatus', async (req, res) => {
    if(req.session.loggedIn && req.session.rememberMe) {
      output.loggedIn = true;
      //get user data
      output.userData = await helpers.getAllData(handle, users);
      res.json(output);
    } else {
      output.loggedIn = true;
      output.userData = await helpers.getAllData('marcusprice', users);
      res.json(output);
    }
  });

  app.post('/api/v1/forgotPassword', (req, res) => {
    users.createTempPassword(req.body.email)
      .then((result) => {
        res.json({result: result});
      })
      .catch((error) => {
        res.json({result: false, reason: error.toString()});
      });
  });

  app.post('/api/v1/createUser', (req, res) => {
    users.createUser(req.body)
      .then((result) => {
        res.json({userCreated: true});
      })
      .catch((error) => {
        res.json({userCreated: false, reason: error.toString()});
      });
  });

  app.get('/api/v1/login', async (req, res) => {
    console.log(req.session.rememberMe);

    //first verify the user's password
    const handle = req.query.handle;
    const password = req.query.password;
    const validated = await users.validatePassword(handle, password);

    let output = {};
    if(validated) {
      //set session variables
      req.session.loggedIn = true;
      if(req.query.rememberMe === 'true') {
        req.session.rememberMe = true;
      } else {
        req.session.rememberMe = false;
      }

      //get all of the user's data
      output.userData = await helpers.getAllData(handle, users);
      //set logged in status to true
      output.loggedIn = true;
      res.json(output);
    } else {
      //send back issue
      output.loggedIn = false;
      output.reason = 'passwords didn\'t match';
      res.json({output});
    }
  });

  app.get('/', (req, res) => {
    res.send('./public/index.html');
  });
}
