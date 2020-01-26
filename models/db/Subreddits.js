const pg = require('./pg');

module.exports = {
  readAllSubreddits: (callback) => {
    const sql = 'SELECT * FROM Subreddits;';
    pg.query(sql, (err, result) => {
      if(err) {
        callback(err, null);
      } else {
        callback(null, result.rows);
      }
    });
  },

  readAllSubredditsByReport: (reportID, callback) => {
    const sql = 'SELECT Subreddits.SubredditName ' +
    'FROM Subreddits ' +
    'LEFT JOIN ReportsSubreddits ' +
    'ON Subreddits.SubredditID = ReportsSubreddits.SubredditID ' +
    'WHERE ReportsSubreddits.ReportID = $1';
    pg.query(sql, [reportID], (error, result) => {
      if(error) {
        callback(error, null);
      } else {
        callback(null, result.rows);
      }
    });
  }
};
