/**
 * Authorization Routes
 * @module authRoutes
 */

const users = require('../controllers/users');  //users controller
const helpers = require('../lib/helpers');      //helper library

/**
 * Handles user authorization for basic login, logout and remember me tasks
 * @param {object} app - instance of express
 */
module.exports = (app) => {

  /**
   * Check to see if the user is logged in and has rememberme set
   * @param {object} req - the express request object
   * @param {object} res - the express response object
   * @return {string/json} - data about the user
   */
  app.get('/checkLoginStatus', async (req, res) => {
    //create output variable with login initialized to false
    let output = { loggedIn: false };
    if(req.session.loggedIn && req.session.rememberMe) {  //user is logged in and has remember me set
      output.loggedIn = true; //user us logged in

      //add user data & report data to output object
      output.userData = await users.getUser(req.session.userID);
      output.reportData = await helpers.getAllReportData(req.session.userID);
    }

    //convert output object to json and send to client
    res.json(output);
  });

  app.get('/login', async (req, res) => {
    let output = {};

    const handle = req.query.handle;
    const password = req.query.password;

    try {
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
        res.json({loggedIn: false, reason: 'password didn\'t match'});
      }
    } catch(error) {
      res.json({loggedIn: false, reason: error.toString()});
    }
  });

  app.get('/logout', (req, res) => {
    req.session.loggedIn = false;
    req.session.rememberMe = false;
    res.json({loggedOut: true});
  });
};
