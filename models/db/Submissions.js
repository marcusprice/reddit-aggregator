const pg = require('./pg');
const validation = require('../../lib/validation');

module.exports = {
  createSubmission: async (submissionData, subredditName, callback) => {
    //validate input data
    const possibleKeys = [
      'redditID',
      'title',
      'url',
      'handle',
      'selfText',
      'submissionTimePostedUTC',
      'submissionEdited',
      'submissionUpvotes',
      'submissionDownvotes',
      'thumbnailURL'
    ];
    const validationError = validation.validateInputData(submissionData, possibleKeys);

    if(validationError) {
      callback(validationError, null);
    } else {
      //first see if the submission has already been saved
      const uniqueCheck = await pg.query('SELECT * FROM Submissions WHERE RedditID = $1;', [submissionData.redditID]);
      if(uniqueCheck.rowCount < 1) {
        //get the subreddit id
        let subreddit = await pg.query('SELECT SubredditID FROM Subreddits WHERE SubredditName = $1', [subredditName]);
        let subredditID = subreddit.rows[0].subredditid;

        //now insert the submission data
        const sql = 'INSERT INTO Submissions ' +
        '(RedditID, SubredditID, Title, URL, SelfText, SubmissionPosterHandle, SubmissionTimePostedUTC, SubmissionEdited, SubmissionUpvotes, SubmissionDownvotes, ThumbnailURL)' +
        'VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING SubmissionID;';
        const values = [
          submissionData.redditID,
          subredditID,
          submissionData.title,
          submissionData.url,
          submissionData.selfText,
          submissionData.handle,
          submissionData.submissionTimePostedUTC,
          submissionData.submissionEdited,
          submissionData.submissionUpvotes,
          submissionData.submissionDownvotes,
          submissionData.thumbnailURL
        ];

        pg.query(sql, values, (err, result) => {
          if(err) {
            //there was an error, send it back
            callback(err, null);
          } else {
            //successful entry, send back the submission id
            callback(null, result.rows[0].submissionid);
          }
        });
      } else {
        //duplicate submission, send back a null value
        callback(null, null);
      }
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

  //TODO: make a join to get the subreddit name
  readAllSubmissionsBySubreddit: async (subredditName, limit, callback) => {
    //get the subreddit id
    const subredditResult = await pg.query('SELECT SubredditID FROM Subreddits WHERE SubredditName = $1', [subredditName]);
    const subredditID = subredditResult.rows[0].subredditid;

    const sql = 'SELECT * FROM Submissions WHERE SubredditID = $1 ORDER BY SubmissionID DESC LIMIT $2;';

    const result = await pg.query(sql, [subredditID, limit]);
    callback(null, result.rows);
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
