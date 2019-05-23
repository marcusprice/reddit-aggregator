const users = require('./controllers/users');
const subreddits = require('./controllers/subreddits');
const reports = require('./controllers/reports');
const tools = require('./lib/tools');
const helpers = require('./lib/helpers');

module.exports = (app) => {
  //logs user on, gets all the data etc.
  let output = {};
  app.get('/checkLoginStatus', async (req, res) => {
    if(req.session.loggedIn && req.session.rememberMe) {
      output.loggedIn = true;
      //get user data
      output.userData = await users.getUser(req.session.userID);
      output.reportData = await helpers.getAllReportData(req.session.userID);
      res.json(output);
    } else {
      output.loggedIn = true;
      //get user data
      output.userData = await users.getUser(1);
      output.reportData = await helpers.getAllReportData(1);
      res.json(output);
    }
  });

  app.post('/forgotPassword', (req, res) => {
    users.createTempPassword(req.body.email)
      .then((result) => {
        res.json({result: result});
      })
      .catch((error) => {
        res.json({result: false, reason: error.toString()});
      });
  });

  app.get('/getSubreddits', async (req, res) => {
    const subredditData = await subreddits.getAllSubreddits();
    console.log(subredditData);
    res.json(subredditData);
  });

  app.post('/createReport', async (req, res) => {
    reports.createReport(req.body)
      .then(async (result) => {
        //USE A SESSION VAR IN PRODUCTION!
        let reports = await helpers.getAllReportData(req.body.userID);
        res.json({reportCreated: result, reportData: reports});
      })
      .catch((error) => {
        res.json({result: false, reason: error.toString()});
      });
  });

  app.get('/updateReportData', async (req, res) => {
    let reports = await helpers.getAllReportData(parseInt(req.query.userID));
    res.json(reports);
  });

  app.post('/createUser', (req, res) => {
    users.createUser(req.body)
      .then((result) => {
        res.json({userCreated: true});
      })
      .catch((error) => {
        res.json({userCreated: false, reason: error.toString()});
      });
  });

  app.get('/login', async (req, res) => {
    let output = {};

    const handle = req.query.handle;
    const password = req.query.password;
    const validated = await users.validatePassword(handle, password);

    if(validated) {
      //get all of the user's data
      output.userData = await helpers.getAllData(handle, users);
      //set logged in status to true
      output.loggedIn = true;

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

  app.get('/', (req, res) => {
    res.send('./public/index.html');
  });
}
