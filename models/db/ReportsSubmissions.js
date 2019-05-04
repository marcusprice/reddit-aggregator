const pg = require('./pg');
const validation = require('../../lib/validation');

module.exports = {
  createEntry: (entryData, callback) => {
    const possibleKeys = ['reportID', 'submissionID'];
    const validationError = validation.validateInputData(entryData, possibleKeys);

    if(validationError) {
      callback(validationError, null);
    } else {
      const sql = 'INSERT INTO ReportsSubmissions ' +
      '(ReportID, SubmissionID) ' +
      'VALUES ($1, $2)';
      const values = [
        entryData.reportID,
        entryData.submissionID
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

  readAllEntries: (callback) => {
    const sql = 'SELECT * FROM ReportsSubmissions';
    pg.query(sql, (err, result) => {
      if (err) {
        callback(err, null);
      } else {
        callback(result, null);
      }
    });
  },

  readAllSubmissionsByReport: (reportID, callback) => {
    if(typeof(reportID) !== 'number') {
      const error = new Error('the input was not a number');
      callback(error, null);
    } else {
      const sql = 'SELECT Submissions.SubmissionID, Title, URL, PosterHandle, DateCreated, LastEdit, Upvotes, Downvotes ' +
      'FROM submissions ' +
      'LEFT JOIN reportssubmissions ' +
      'ON submissions.submissionid = reportssubmissions.submissionid ' +
      'WHERE reportssubmissions.reportid = $1;'
      const values = [reportID];

      pg.query(sql, values, (err, result) => {
        if(err) {
          callback(err, null);
        } else {
          callback(null, result.rows);
        }
      });
    }
  },

  deleteEntry: () => {

  }
}
