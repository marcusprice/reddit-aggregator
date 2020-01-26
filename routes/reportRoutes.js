/**
 * Report Routes
 * @module reportRoutes
 */

const reports = require('../controllers/reports');
const helpers = require('../lib/helpers');

/**
 * Enpoint for report tasks
 * @param {object} app - instance of express
 */
module.exports = (app) => {

  /**
   * Update Report Data
   * Endpoint to update report data from the client
   * @param {object} req - the express request object
   * @param {object} res - the express response object
   * @return {string/json} - report data
   */
  app.get('/updateReportData', async (req, res) => {
    if(req.session.loggedIn && req.session.userID) {  //if the user is logged in and user id is set
      //get the user's reports and return them to the client
      let reports = await helpers.getAllReportData(req.session.userID);
      res.json(reports);
    } else {  //user isn't logged in (possible malacious activity!)
      //user wasn't logged in, return a failure notice
      res.json({result: 'failed', reason: 'user isn\'t logged in'});
    }
  });




  /**
   * Create Report
   * Endpoint to create a new report
   * @param {object} req - the express request object
   * @param {object} res - the express response object
   * @return {string/json} - result and an updated array of reports or reason of error
   */
  app.post('/createReport', async (req, res) => {
    if(req.session.loggedIn && req.session.userID) {  //if the user is logged in and user id is set
      //create a new report
      reports.createReport(req.body)
        .then(async (result) => { //report was succesfully created
          //get updated report array and send to the client
          let reports = await helpers.getAllReportData(req.session.userID);
          res.json({reportCreated: result, reportData: reports});
        })
        .catch((error) => { //there was an error
          //send the error back to the client
          res.json({reportCreated: false, reason: error.toString()});
        });
    } else {  //user isn't logged in (possible malacious activity!)
      res.json({reportCreated: false, reason: 'user isn\'t logged in'})
    }
  });

<<<<<<< HEAD
  app.get('/getReport', async (req, res) => {
    let output = {report: null}
    const reportID = parseInt(req.query.reportID);
    output.report = await helpers.getAllReportData(reportID);
    res.json(output);
  })

=======



  /**
   * Edit Report
   * Endpoint to udpate an existing report
   * @param {object} req - the express request object
   * @param {object} res - the express response object
   * @return {string/json} - result and an updated array of reports or reason of error
   */
  app.post('/editReport', async (req, res) => {
    if(req.session.loggedIn && req.session.userID) {  //if the user is logged in and user id is set
      const userID = req.body.userID;
      const reportID = req.body.reportID;
      const reportData = {
        name: req.body.name,
        description: req.body.description,
        subreddits: req.body.subreddits,
        notifications: req.body.notifications
      };

      reports.editReport(reportID, reportData)
        .then(async (result) => {
          let reports = await helpers.getAllReportData(userID);
          res.json({reportEdited: result, reportData: reports});
        })
        .catch((error) => {
          res.json({reportEdited: false, reportData: error.toString()});
        });
    } else {  //user isn't logged in (possible malacious activity!)
      res.json({reportCreated: false, reason: 'user isn\'t logged in'})
    }
  });




  /**
   * Delete Report
   * Endpoint to delete an existing report
   * @param {object} req - the express request object
   * @param {object} res - the express response object
   * @return {string/json} - result and an updated array of reports or reason of error
   */
>>>>>>> master
  app.get('/deleteReport', async (req, res) => {
    const reportID = parseInt(req.query.reportID);
    const userID = parseInt(req.query.userID);
    reports.deleteReport(reportID)
      .then(async (result) => {
        let reports = await helpers.getAllReportData(userID);
        res.json({reportDeleted: result, reportData: reports});
      })
      .catch((error) => {
        res.json({reportDeleted: false, reason: error.toString()});
      });
  });
}
