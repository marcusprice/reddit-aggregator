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
  }
};
