/**
 * User Routes
 * @module userRoutes
 */

const users = require('../controllers/users');  //users controller

module.exports = (app) => {
  app.post('/createUser', (req, res) => {
    users.createUser(req.body)
      .then((result) => {
        res.json({userCreated: true});
      })
      .catch((error) => {
        res.json({userCreated: false, reason: error.toString()});
      });
  });

  app.post('/editUser', (req, res) => {
    users.editUser(req.body.userID, req.body.userData)
      .then((result) => {
        res.json({userEdited: true, userData: result})
      })
      .catch((error) => {
        res.json({userEdited: false, reason: error.toString()});
      });
  });

  app.post('/changePassword', (req, res) => {
    users.changePassword(req.body.userID, req.body.password)
      .then((result) => {
        res.json({passwordChanged: true});
      })
      .catch(() => {
        res.json({passwordChanged: false});
      });
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
}
