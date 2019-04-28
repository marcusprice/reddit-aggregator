const pg = require('./pg');
const validation = require('../lib/validation');

module.exports = {
  createComment: (commentData, callback) => {
    const possibleKeys = ['submissionID', 'comment', 'edits', 'upvotes', 'downvotes'];
    const validationError = validation.validateInputData(commentData, possibleKeys);

    if(validationError) {
      callback(validationError, null);
    } else {
      const sql = 'INSERT INTO Comments ' +
      '(SubmissionID, Comment, DatePosted, Edits, Upvotes, Downvotes)' +
      'VALUES ($1, $2, now(), $3, $4, $5);';
      const values = [
        commentData.submissionID,
        commentData.comment,
        commentData.edits,
        commentData.upvotes,
        commentData.downvotes
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

  readComment: (commentID, callback) => {
    if(typeof(commentID) !== 'number') {
      const error = new Error('input was not a number');
      callback(error, null);
    } else {
      const sql = 'SELECT * FROM Comments WHERE CommentID = $1';
      const values = [commentID];

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

  updateComment: (commentID, commentData, callback) => {
    const possibleKeys = ['comment', 'edits', 'upvotes', 'downvotes'];
    const validationError = validation.validateInputData(commentData, possibleKeys);

    if(validationError) {
      callback(validationError, null);
    } else {
      const sql = 'UPDATE Comments ' +
      'SET Comment = $1, Edits = $2, Upvotes = $3, Downvotes = $4 WHERE CommentID = $5;';
      const values = [
        commentData.comment,
        commentData.edits,
        commentData.upvotes,
        commentData.downvotes,
        commentID
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

  deleteComment: (commentID, callback) => {
    if(typeof(commentID) !== 'number') {
      const error = new Error('the input was not a number');
      callback(error, null);
    } else {
      const sql = 'DELETE FROM Comments WHERE CommentID = $1';
      const values = [commentID];

      pg.query(sql, values, (err, result) => {
        if (err) {
          callback(err, null);
        } else {
          callback(null, true);
        }
      });
    }
  }
}
