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

  //involves several models. Used to get all data related to a specific user
  getAllData: (handle, callback) => {
    new Promise((resolve, reject) => {
      //get user data
      Users.readUser(handle, (error, result) => {
        if(error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    })
    .then((userData) => {
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
    })
    .then(async (userData) => {
      //loop through all reports to get submission data
      await tools.asyncForEach(userData.reports, async (report, index) => {
        //save report ID into variable and get the submissions for the report
        let reportID = report.reportid;
        let submissions = await getAllSubmissions(reportID);

        //save the submissions into the users data object
        userData.reports[index].submissions = submissions;
      });

      console.log(userData);
      return userData;
    })
    .then((userData) => {
      //will get the
      callback(null, userData);
    })
    .catch((err) => {
      callback(err, null);
    });
  }
}

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
  }
