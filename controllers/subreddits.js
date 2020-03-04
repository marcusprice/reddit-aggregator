const Subreddits = require('../models/db/Subreddits');

module.exports = {
  getAllSubredditsByReport: (reportID) => {
    return new Promise((resolve, reject) => {
      Subreddits.readAllSubredditsByReport(reportID, (error, result) => {
        if(error) {
          reject(error);
        } else {
          //create an array of subreddit names only
          result = result.map(subreddit => subreddit.subredditname);
          resolve(result);
        }
      });
    });
  },

  getAllSubreddits: () => {
    return new Promise((resolve, reject) => {
      Subreddits.readAllSubreddits((error, result) => {
        if(error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  }
};
