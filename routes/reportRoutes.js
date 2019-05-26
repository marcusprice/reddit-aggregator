const reports = require('../controllers/reports');
const helpers = require('../lib/helpers');

module.exports = (app) => {
  app.get('/updateReportData', async (req, res) => {
    let reports = await helpers.getAllReportData(parseInt(req.query.userID));
    res.json(reports);
  });

  app.post('/createReport', async (req, res) => {
    reports.createReport(req.body)
      .then(async (result) => {
        //USE A SESSION VAR IN PRODUCTION!
        let reports = await helpers.getAllReportData(req.body.userID);
        res.json({reportCreated: result, reportData: reports});
      })
      .catch((error) => {
        res.json({reportCreated: false, reason: error.toString()});
      });
  });

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

  app.post('/editReport', async (req, res) => {
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
  });
}
