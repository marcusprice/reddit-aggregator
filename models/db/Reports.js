const pg = require('./pg');
const validation = require('../../lib/validation');

module.exports = {
  createReport: (reportData, callback) => {
    //validate input data
    const possibleKeys = [
      'userID',
      'name',
      'description',
      'subreddits',
      'filteredIn',
      'filteredOut',
      'submissionLimit',
      'notifications'
    ];
    const validationError = validation.validateInputData(reportData, possibleKeys);

    if(validationError) {
      callback(validationError, null);
    } else {
      const sql = 'INSERT INTO Reports ' +
      '(UserID, Name, Description, Subreddits, FilteredIn, FilteredOut, SubmissionLimit, DateCreated, LastEdit, Notifications)' +
      'VALUES ($1, $2, $3, $4, $5, $6, $7, now(), now(), $8);';

      const values = [
        reportData.userID,
        reportData.name,
        reportData.description,
        reportData.subreddits,
        reportData.filteredIn,
        reportData.filteredOut,
        reportData.submissionLimit,
        reportData.notifications
      ];

      pg.query(sql, values, (err, result) => {
        if(err) {
          callback(err, null);
        } else {
          callback(null, true);
        }
      });
    }
  },

  readReport: (reportID, callback) => {
    if(typeof(reportID) !== 'number') {
      const error = new Error('the input was not a number');
      callback(error, null);
    } else {
      const sql = 'SELECT * FROM Reports WHERE ReportID = $1';
      const values = [reportID];

      pg.query(sql, values, (err, result) => {
        if(err) {
          callback(err, null);
        } else {
          if(result.rows.length < 1) {
            const error = new Error('no results found');
            callback(error, null);
          } else {
            callback(null, result.rows[0]);
          }
        }
      });
    }
  },

  readAllReportsByUser: (userID, callback) => {
    if(typeof(userID) !== 'number') {
      const error = new Error('the input was not a number');
      callback(error, null);
    } else {
      const sql = 'SELECT * FROM Reports WHERE UserID = $1';
      const values = [userID];

      pg.query(sql, values, (err, result) => {
        if(err) {
          callback(err, null);
        } else {
          if(result.rows.length < 1) {
            const error = new Error('no results found');
            callback(error, null);
          } else {
            callback(null, result.rows);
          }
        }
      });
    }
  },

  updateReport: (reportID, reportData, callback) => {
    //validate input data
    const possibleKeys = [
      'name',
      'description',
      'subreddits',
      'filteredIn',
      'filteredOut',
      'submissionLimit',
      'notifications'
    ];
    const validationError = validation.validateInputData(reportData, possibleKeys);

    if(validationError) {
      callback(validationError, null);
    } else {
      const sql = 'UPDATE Reports ' +
      'SET Name = $1, Description = $2, Subreddits = $3, FilteredIn = $4, FilteredOut = $5, SubmissionLimit = $6, Notifications = $7 ' +
      'WHERE ReportID = $8;';

      const values = [
        reportData.name,
        reportData.description,
        reportData.subreddits,
        reportData.filteredIn,
        reportData.filteredOut,
        reportData.submissionLimit,
        reportData.notifications,
        reportID
      ];

      pg.query(sql, values, (err, result) => {
        if(err) {
          callback(err, null);
        } else {
          callback(null, true);
        }
      });
    }
  },

  deleteReport: (reportID, callback) => {
    if(typeof(reportID) !== 'number') {
      const error = new Error('the input was not a number');
      callback(error, null);
    } else {
      const sql = 'DELETE FROM Reports WHERE ReportID = $1;';
      values = [reportID];

      pg.query(sql, values, (err, result) => {
        if(err) {
          callback(err, null);
        } else {
          callback(null, true);
        }
      });
    }
  }
}
