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
      //get the subreddit id
      let subreddit = await pg.query('SELECT SubredditID FROM Subreddits WHERE SubredditName = $1', [subredditName]);
      let subredditID = subreddit.rows[0].subredditid;

      //test if the handle exists already or not
      let handleID;
      const handleResults = await pg.query('SELECT HandleID FROM Handles WHERE HandleName = $1', [submissionData.handle]);
      if(handleResults.rowCount > 0) {
        //handle already exists, get it's id
        handleID = handleResults.rows[0].handleid;
      } else {
        //create a new handle and get its id
        handleID = await pg.query('INSERT INTO Handles (HandleName) VALUES ($1) RETURNING HandleID;', [submissionData.handle]);
        handleID = handleID.rows[0].handleid;
      }

      //now insert the submission data
      const sql = 'INSERT INTO Submissions ' +
      '(RedditID, SubredditID, Title, URL, SelfText, HandleID, SubmissionTimePostedUTC, SubmissionEdited, SubmissionUpvotes, SubmissionDownvotes, ThumbnailURL)' +
      'VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING SubmissionID;';
      const values = [
        submissionData.redditID,
        subredditID,
        submissionData.title,
        submissionData.url,
        submissionData.selfText,
        handleID,
        submissionData.submissionTimePostedUTC,
        submissionData.submissionEdited,
        submissionData.submissionUpvotes,
        submissionData.submissionDownvotes,
        submissionData.thumbnailURL
      ];

      await pg.query(sql, values);
      callback(null, true);
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
