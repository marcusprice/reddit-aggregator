const reports = require('../controllers/reports');
const helpers = require('../lib/helpers');

module.exports = (app) => {
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

  app.get('/updateReportData', async (req, res) => {
    let reports = await helpers.getAllReportData(parseInt(req.query.userID));
    res.json(reports);
  });

  app.get('/deleteReport', async (req, res) => {
    const reportID = req.query.reportID;
    const userID = req.query.userID;
    reports.deleteReport(reportID)
      .then(async (result) => {
        let reports = await helpers.getAllReportData(req.body.userID);
        res.json({reportDeleted: result, reportData: reports});
      })
      .catch((error) => {
        res.json({reportDeleted: false, reason: error.toString()});
      });

  });
}
