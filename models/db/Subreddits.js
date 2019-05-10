const pg = require('./pg');
const validation = require('../../lib/validation');

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
  }
};
