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

  createReport: (reportData) => {
    return new Promise((resolve, reject) => {
      Reports.createReport(reportData, (error, result) => {
        if(error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  },

  editReport: (reportID, reportData) => {
    return new Promise((resolve, reject) => {
      Reports.updateReport(reportID, reportData, (error, result) => {
        if(error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  },

  deleteReport: (reportID) => {
    return new Promise((resolve, reject) => {
      Reports.deleteReport(reportID, (error, result) => {
        if(error) {
          reject(error);
        } else {
          resolve(result);
        }
      })
    })
  }
};
