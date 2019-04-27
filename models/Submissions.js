const pg = require('./pg');
const validation = require('../lib/validation');

module.exports = {
  createSubmission: (submissionData, callback) => {
    //validate input data
    const possibleKeys = [
      'title',
      'url',
      'posterHandle',
      'upvotes',
      'downvotes'
    ];
    const validationError = validation.validateInputData(submissionData, possibleKeys);

    if(validationError) {
      callback(validationError, null);
    } else {
      const sql = 'INSERT INTO Submissions ' +
      '(Title, Url, PosterHandle, DateCreated, LastEdit, Upvotes, Downvotes)' +
      'VALUES ($1, $2, $3, now(), now(), $4, $5);';
      const values = [
        submissionData.title,
        submissionData.url,
        submissionData.posterHandle,
        submissionData.upvotes,
        submissionData.downvotes
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

  readSubmission: (submissionID, callback) => {
    if(typeof(submissionID) !== 'number') {
      const error = new Error('input was not a number');
      callback(error, null);
    } else {
      const sql = 'SELECT * FROM Submissions WHERE SubmissionID = $1';
      const values = [submissionID];

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

  updateSubmission: (submissionID, submissionData, callback) => {
    //validate input data
    const possibleKeys = [
      'title',
      'url',
      'posterHandle',
      'upvotes',
      'downvotes'
    ];
    const validationError = validation.validateInputData(submissionData, possibleKeys);

    if(validationError) {
      callback(validationError, null);
    } else {
      const sql = 'UPDATE Submissions ' +
      'SET Title = $1, URL = $2, PosterHandle = $3, Upvotes = $4, Downvotes = $5 ' +
      'WHERE SubmissionID = $6;';

      const values = [
        submissionData.title,
        submissionData.url,
        submissionData.posterHandle,
        submissionData.upvotes,
        submissionData.downvotes,
        submissionID
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

  deleteSubmission: (submissionID, callback) => {
    if(typeof(submissionID) !== 'number') {
      const error = new Error('the input was not a number');
      callback(error, null);
    } else {
      const sql = 'DELETE FROM Submissions WHERE SubmissionID = $1;';
      const values = [submissionID];

      pg.query(sql, values, (err, result) => {
        if(err) {
          callback(err, null);
        } else {
          if(result.rows.length < 1) {
            callback(null, true);
          } else {
            callback(null, true);    
          }
        }
      });
    }
  }
}
