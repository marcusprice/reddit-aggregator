/**
 * User Routes
 * @module userRoutes
 */

const users = require('../controllers/users');  //users controller

/**
 * Enpoints for user tasks
 * @param {object} app - instance of express
 */
module.exports = (app) => {

  /**
   * Create User
   * Endpoint for creating a new user
   * @param {object} req - the express request object
   * @param {object} res - the express response object
   * @return {string/json} - success/fail reposnse
   */
  app.post('/createUser', (req, res) => {
    users.createUser(req.body)
      .then((result) => {
        req.session.loggedIn = true;
        req.session.userID = result.userData.userid;

        res.json({userCreated: true, userData: result.userData});
      })
      .catch((error) => {
        console.log({userCreated: false, reason: error.toString()});
        res.json({userCreated: false, reason: error.toString()});
      });
  });




  /**
   * Edit User
   * Endpoint for editing user info
   * @param {object} req - the express request object
   * @param {object} res - the express response object
   * @return {string/json} - success/fail reposnse
   */
  app.post('/editUser', (req, res) => {
    if(req.session.loggedIn && req.session.userID) {    //if the user is logged in and the user ID is set
      users.editUser(req.session.userID, req.body.userData)
        .then((result) => {
          res.json({userEdited: true, userData: result})
        })
        .catch((error) => {
          res.json({userEdited: false, reason: error.toString()});
        });
    } else {  //user is not logged in (possibly malacious activity!)
      res.json({userEdited: false, reason: 'user isn\'t logged in'});
    }
  });




  /**
   * Change User's Password
   * Endpoint for editing users password
   * @param {object} req - the express request object
   * @param {object} res - the express response object
   * @return {string/json} - success/fail reposnse
   */
  app.post('/changePassword', async (req, res) => {
    if(req.session.loggedIn && req.session.userID) {    //if the user is logged in and the user ID is set
      const userID = req.session.userID;
      const newPassword = req.body.newPassword;

      users.changePassword(req.session.userID, newPassword)
        .then((result) => {
          res.json({ passwordChanged: true });
        })
        .catch(() => {
          res.json({ passwordChanged: false });
        });

    } else {  //user is not logged in (possibly malacious activity!)
      res.json({passwordChanged: false, reason: 'user isn\'t logged in'});
    }
  });




  /**
   * Forgot Password
   * Endpoint for requesting password reset
   * @param {object} req - the express request object
   * @param {object} res - the express response object
   * @return {string/json} - success/fail reposnse
   */
  app.get('/forgotPassword', (req, res) => {
    users.createTempPassword(req.query.email)
      .then((result) => {
        res.json({tempPasswordSet: result});
      })
      .catch((error) => {
        res.json({tempPasswordSet: false, reason: error.toString()});
      });
  });
}
