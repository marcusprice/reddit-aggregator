const Submissions = require('../models/db/submissions');

module.exports = {
  getAllSubmissionsBySubreddit: (subredditName) => {
    return new Promise((resolve, reject) => {
      Submissions.readAllSubmissionsBySubreddit(subredditName, 24, (error, result) => {
        if(error) {
          reject(error);
        } else {
          resolve(result);
        }
      })
    });
  }
};
