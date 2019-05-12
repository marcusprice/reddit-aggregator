const pg = require('./pg');
const validation = require('../../lib/validation');

module.exports = {
  readHandle: async (handleID, callback) => {
    const sql = 'SELECT HandleName FROM Handles WHERE HandleID = $1';
    const result = await pg.query(sql, [handleID]);
    callback(null, result.rows[0].handlename);
  }
};
