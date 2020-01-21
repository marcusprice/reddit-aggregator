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
        res.json({userCreated: true});
      })
      .catch((error) => {
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
    users.editUser(req.body.userID, req.body.userData)
      .then((result) => {
        res.json({userEdited: true, userData: result})
      })
      .catch((error) => {
        res.json({userEdited: false, reason: error.toString()});
      });
  });

  /**
   * Change User's Password
   * Endpoint for editing user info
   * @param {object} req - the express request object
   * @param {object} res - the express response object
   * @return {string/json} - success/fail reposnse
   */
  app.post('/changePassword', (req, res) => {
    users.changePassword(req.body.userID, req.body.password)
      .then((result) => {
        res.json({passwordChanged: true});
      })
      .catch(() => {
        res.json({passwordChanged: false});
      });
  });

  /**
   * Forgot Password
   * Endpoint for requesting password reset
   * @param {object} req - the express request object
   * @param {object} res - the express response object
   * @return {string/json} - success/fail reposnse
   */
  app.post('/forgotPassword', (req, res) => {
    users.createTempPassword(req.body.email)
      .then((result) => {
        res.json({result: result});
      })
      .catch((error) => {
        res.json({result: false, reason: error.toString()});
      });
  });
}
