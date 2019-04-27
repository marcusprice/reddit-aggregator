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

  readSubmission: () => {

  },

  updateSubmission: () => {

  },

  deleteSubmission: () => {

  }
}
