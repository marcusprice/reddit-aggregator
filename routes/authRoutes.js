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
   * Check Login Status
   * Endpoint to check if the user is logged in and has rememberme set
   * @param {object} req - the express request object
   * @param {object} res - the express response object
   * @return {string/json} - data about the user
   */
  app.get('/checkLoginStatus', async (req, res) => {
    //create output variable with login initialized to false
    let output = { loggedIn: false };
    if(req.session.loggedIn && req.session.rememberMe) {  //user is logged in and has remember me set
      output.loggedIn = true; //user is logged in

      //add user data & report data to output object
      output.userData = await users.getUser(req.session.userID);
      output.reportData = await helpers.getAllReportData(req.session.userID);
    }

    //convert output object to json and send to client
    res.json(output);
  });


  /**
   * Login
   * Endpoint to log user in
   * @param {object} req - the express request object
   * @param {object} res - the express response object
   * @return {string/json} - data about the user
   */
  app.get('/login', async (req, res) => {
    //create output variable with login initialized to false
    let output = { loggedIn: false };

    //save handle, password, rememberMe into constants
    const handle = req.query.handle;
    const password = req.query.password;
    const rememberMe = req.query.rememberMe;

    try {
      //try to validate user
      const validated = await users.validatePassword(handle, password);
      if(validated) { //user is validated

        //set logged in to true, save user & report data
        output.loggedIn = true;
        output.userData = await users.getUser(handle);
        output.reportData = await helpers.getAllReportData(output.userData.userid);

        //set session variables for logged in state and userID
        req.session.loggedIn = true;
        req.session.userID = output.userData.userid;  //this CANNOT be set from user input, needs DB return value

        if(rememberMe === 'true') { //user requested to be remembered
          //set remember me session to true
          req.session.rememberMe = true;
        } else {  //user doesn't want to be remembered
          //set remember me session to true
          req.session.rememberMe = false;
        }
      } else {  //user is not validated
        //set reason property
        output.reason = 'Username/email or password didn\'t match';
      }
    } catch(error) {  //there was some kind of error
      //convert error to string and set the reason
      output.reason = error.toString()
    }

    //convert output object to json and send to client
    res.json(output);
  });


  /**
   * Logout
   * Endpoint to log user out
   * @param {object} req - the express request object
   * @param {object} res - the express response object
   * @return {string/json} - data about the user
   */
  app.get('/logout', (req, res) => {
    //set logged in & remember me session variables to false
    req.session.loggedIn = false;
    req.session.rememberMe = false;

    //send client json object with success message
    res.json({ loggedOut: true });
  });
};
