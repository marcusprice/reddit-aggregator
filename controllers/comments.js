const Comments = require('../models/db/Comments');

module.exports = {
  getAllCommentsForSubmission: (submissionID) => {
    return new Promise((resolve, reject) => {
      Comments.readAllCommentsBySubmission(submissionID, (error, result) => {
        if(error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  }
};
