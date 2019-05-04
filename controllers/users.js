const Users = require('../models/db/Users');
const Reports = require('../models/db/Reports');
const Submissions = require('../models/db/Submissions');
const ReportsSubmissions = require('../models/db/ReportsSubmissions');
const Comments = require('../models/db/Comments');
const tools = require('../lib/tools');

module.exports = {

  verifyPassword: (handle, password, callback) => {
    //call the readPassword model
    Users.readPassword(handle, (error, result) => {
      if(error) {
        //there was an error, send it back
        callback(error, null);
      } else {
        if(result === password) {
          //passwords matched, send back a true value
          callback(error, true);
        } else {
          //passwords did not match
          callback(error, false);
        }
      }
    });
  },

  //used to get all data related to a specific user
  getAllData: (handle, callback) => {
    //get the user's account data
    readUser(handle)
    .then((userData) => {
      //get all of the user's reports
      return getAllReports(userData);
    })
    .then(async (userData) => {
      //get the user's report submissions & submission-comments
      //save reports into a variable
      let userReports = userData.reports;

      //loop through each report
      await tools.asyncForEach(userReports, async (report, index) => {
        //get all submissions for the report
        let reportID = report.reportid;
        let submissions = await getAllSubmissions(reportID);

        //loop through each submssion in the report
        await tools.asyncForEach(submissions, async (submission, index) => {
          //get the comments for each submission
          let submissionID = submission.submissionid;
          submissions[index].comments = await getAllComments(submissionID);
        });

        //save the submissions into the userData object
        userData.reports[index].submissions = submissions;
      });

      //return the data which now has the submissions saved
      callback(null, userData);
    })
    .catch((error) => {
      callback(error, null);
    });
  }

};

const readUser = (handle) => {
  return new Promise((resolve, reject) => {
    //get user data
    Users.readUser(handle, (error, result) => {
      if(error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  })
};

const getAllReports = (userData) => {
  //get all of the user's reports
  return new Promise((resolve, reject) => {
    Reports.readAllReportsByUser(userData.userid, (error, result) => {
      if(error) {
        reject(error);
      } else {
        userData.reports = result;
        resolve(userData);
      }
    });
  });
};

const getAllSubmissions = (reportID) => {
  return new Promise((resolve, reject) => {
    //get the submissions that are saved in that report
    ReportsSubmissions.readAllSubmissionsByReport(reportID, (error, result) => {
      if(error) {
        //if there is an error reject
        reject(error);
      } else {
        //no error, save the array of submissions to the report
        resolve(result);
      }
    });
  });
};

const getAllComments = (submissionID) => {
  return new Promise((resolve, reject) => {
    Comments.readAllCommentsBySubmission(submissionID, (error, result) => {
      if(error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};
