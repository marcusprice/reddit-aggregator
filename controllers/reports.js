const Reports = require('../models/db/Reports');

module.exports = {
  getAllReportsByUser: (userID) => {
    return new Promise((resolve, reject) => {
      Reports.readAllReportsByUser(userID, (error, results) => {
        if(error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  },

  createReport(reportData) {
    return new Promise((resolve, reject) => {
      Reports.createReport(reportData, (error, result) => {
        if(error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  }
};
