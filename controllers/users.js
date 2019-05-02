const Users = require('../models/Users');
const Reports = require('../models/Reports');
const Submissions = require('../models/Submissions');
const ReportsSubmissions = require('../models/ReportsSubmissions');
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
      //save the user's reports array into avariable
      let userReports = userData.reports;
      
      //loop through all reports to get submission data
      await tools.asyncForEach(userReports, async (report, index) => {
        //save report ID into variable and get the submissions for the report
        let reportID = report.reportid;
        let submissions = await getAllSubmissions(reportID);

        //save the submissions into the users data object
        userData.reports[index].submissions = submissions;
      });

      //return the data which now has the submissions saved
      return userData;
    })
    .then((userData) => {
      //get the top submission comments
      callback(null, userData);
    })
    .catch((err) => {
      callback(err, null);
    });
  }
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
}
