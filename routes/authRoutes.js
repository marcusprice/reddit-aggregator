const users = require('../controllers/users');
const helpers = require('../lib/helpers');

module.exports = (app) => {
  app.get('/checkLoginStatus', async (req, res) => {
    let output = {};
    if(req.session.loggedIn && req.session.rememberMe) {
      output.loggedIn = true;
      //get user data
      output.userData = await users.getUser(req.session.userID);
      output.reportData = await helpers.getAllReportData(req.session.userID);
      res.json(output);
    } else {
      //output.loggedIn = false;
      output.loggedIn = true;
      output.userData = await users.getUser(1);
      output.reportData = await helpers.getAllReportData(1);
      res.json(output);
    }
  });

  app.get('/login', async (req, res) => {
    let output = {};

    const handle = req.query.handle;
    const password = req.query.password;
    const validated = await users.validatePassword(handle, password);

    if(validated) {
      //set output properties
      output.loggedIn = validated;
      output.userData = await users.getUser(handle);
      output.reportData = await helpers.getAllReportData(output.userData.userid);

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

  app.get('/logout', (req, res) => {
    req.session.loggedIn = false;
    req.session.rememberMe = false;
    res.json({loggedOut: true});
  });
};
