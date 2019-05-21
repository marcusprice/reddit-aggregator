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
      output.userData = await helpers.getAllData(req.session.userID, users);
      res.json(output);
    } else {
      console.log('yo');
      output.loggedIn = true;
      output.userData = await helpers.getAllData('marcusprice', users);
      output.reports = output.userData.reports;
      console.log(output);
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
    let output = {};

    const handle = req.query.handle;
    const password = req.query.password;
    const validated = await users.validatePassword(handle, password);

    if(validated) {
      //get all of the user's data
      output.userData = await helpers.getAllData(handle, users);
      //set logged in status to true
      output.loggedIn = true;

      //set session variables
      req.session.loggedIn = true;
      req.session.userID = output.userData.userid;
      if(req.query.rememberMe === 'true') {
        req.session.rememberMe = true;
      } else {
        req.session.rememberMe = false;
      }

      res.json(output);
    } else {
      //send back issue
      output.loggedIn = false;
      output.reason = 'passwords didn\'t match';
      res.json({output});
    }
  });

  app.get('/api/vi/logout', (req, res) => {
    req.session.loggedIn = false;
    req.session.rememberMe = false;
    res.json({loggedOut: true});
  });

  app.get('/', (req, res) => {
    res.send('./public/index.html');
  });
}
