const pg = require('./pg');
const validation = require('../../lib/validation');

module.exports = {
  createComment: async (commentData, callback) => {
    //validate input data
    const possibleKeys = ['comment', 'redditid', 'submissionID', 'handle', 'datePosted', 'edited', 'upvotes', 'downvotes'];
    const validationError = validation.validateInputData(commentData, possibleKeys);

    if(validationError) {
      //there was a validation error
      callback(validationError, null);
    } else {
      //first see if the comment has already been saved
      const uniqueCheck = await pg.query('SELECT * FROM Comments WHERE RedditID = $1', [commentData.redditid]);
      if(uniqueCheck.rowCount < 1) {
        //save the comment data into the db
        const sql = 'INSERT INTO Comments (CommentText, RedditID, SubmissionID, CommentPosterHandle, DatePosted, Edits, Upvotes, Downvotes)' +
        'VALUES ($1, $2, $3, $4, $5, $6, $7, $8);';
        const values = [
          commentData.comment,
          commentData.redditid,
          commentData.submissionID,
          commentData.handle,
          commentData.datePosted,
          commentData.edited,
          commentData.upvotes,
          commentData.downvotes
        ];

        pg.query(sql, values, (err, result) => {
          if(err) {
            //there was an error, send it back
            callback(err, null);
          } else {
            //successful insert, send back true value
            callback(null, true);
          }
        });
      } else {
        callback('comment already exists', null);
      }
    }
  },

  readComment: (commentID, callback) => {
    if(typeof(commentID) !== 'number') {
      //input was not a number, send back an error
      const error = new Error('input was not a number');
      callback(error, null);
    } else {
      //input type was correct
      const sql = 'SELECT * FROM Comments WHERE CommentID = $1';
      const values = [commentID];

      //run db query
      pg.query(sql, values, (err, result) => {
        if(err) {
          //there was a db error, send it back
          callback(err, null);
        } else {
          //db was fine
          if(result.rows.length < 1) {
            //no results found, send back error
            const error = new Error('no results found');
            callback(error, null);
          } else {
            //send back the results
            callback(null, result.rows[0]);
          }
        }
      });
    }
  },

  readAllCommentsBySubmission: (submissionID, callback) => {
    const sql = 'SELECT * FROM Comments WHERE SubmissionID = $1';
    const values = [submissionID];

    pg.query(sql, values, (err, result) => {
      if(err) {
        callback(err, null);
      } else {
        callback(null, result.rows);
      }
    });
  },

  updateComment: (commentID, commentData, callback) => {
    //input was not a number, send back an error
    const possibleKeys = ['comment', 'edits', 'upvotes', 'downvotes'];
    const validationError = validation.validateInputData(commentData, possibleKeys);

    if(validationError) {
      //there was a validation error
      callback(validationError, null);
    } else {
      //input type was correct
      const sql = 'UPDATE Comments ' +
      'SET Comment = $1, Edits = $2, Upvotes = $3, Downvotes = $4 WHERE CommentID = $5;';
      const values = [
        commentData.comment,
        commentData.edits,
        commentData.upvotes,
        commentData.downvotes,
        commentID
      ];

      //run db query
      pg.query(sql, values, (err, result) => {
        if(err) {
          //there was a db error - send it back
          callback(err, null);
        } else {
          //comment was updated, send back true value
          callback(null, true);
        }
      });
    }
  },

  deleteComment: (commentID, callback) => {
    if(typeof(commentID) !== 'number') {
      //input was not a number, send back an error
      const error = new Error('the input was not a number');
      callback(error, null);
    } else {
      //input was fine, build sql query
      const sql = 'DELETE FROM Comments WHERE CommentID = $1';
      const values = [commentID];

      //run db query
      pg.query(sql, values, (err, result) => {
        if (err) {
          //there was a db error - send it back
          callback(err, null);
        } else {
          //comment was deleted, send back true value
          callback(null, true);
        }
      });
    }
  }
}
