const Subreddits = require('../models/db/Subreddits');

module.exports = {
  getAllSubredditsByReport: (reportID) => {
    return new Promise((resolve, reject) => {
      Subreddits.readAllSubredditsByReport(reportID, (error, result) => {
        if(error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  }
};
