const pg = require('./pg');
const validation = require('../lib/validation');

module.exports = {
  createUser: (userData, callback) => {
    //test input data
    const possibleKeys = ['username', 'email', 'password', 'firstName', 'lastName'];
    const validationError = validation.validateInputData(userData, possibleKeys);

    if(validationError) {
      callback(validationError, null);
    } else {
      new Promise((resolve, reject) => {
        module.exports.verifyUniqueHandle(userData, 'createUser', null, (err, result) => {
          if(err) {
            reject(err);
          } else {
            resolve();
          }
        });
      })
        .then(() => {
          //handle is unique, okay to create new user
          //build sql query
          const sql = 'INSERT INTO Users ' +
          '(Username, Email, Password, FirstName, LastName, DateCreated, LastLogin) ' +
          'VALUES ($1, $2, $3, $4, $5, now(), now());';

          //store the input values into an array for query input
          const values = [
            userData.username,
            userData.email,
            userData.password,
            userData.firstName,
            userData.lastName
          ];

          //run db query
          pg.query(sql, values, (err, result) => {
            if(err) {
              //reject w/error if there is a problem
              callback(err, null);
            } else {
              //send back a true value signaling successful db entry
              callback(null, true);
            }
          });
        })
        .catch((err) => {
          callback(err, null);
        });
    }
  },

  readUser: () => {

  },

  updateUser: () => {

  },

  deleteUser: () => {

  },

  verifyUniqueHandle: (newUserData, operation, userid = null, callback) => {
    //store the values into an array for a parameratized query
    let values = [newUserData.username, newUserData.email];
    //sql statement will see if username or password is already used
    let sql = 'SELECT * FROM users WHERE (username = $1 OR email = $2 OR username = $2 OR email = $1)';
    if(operation === 'updateUser') {
      values.push(userid);
      sql += ' AND (userid <> $3);';
    } else {
      sql += ';';
    }
    //run db query
    pg.query(sql, values, (err, res) => {
      if(err) {
        //if there is a db error, reject with the err message
        callback(err, null);
      } else {
        //if there is no error
        if(res.rows.length > 0) {
          //there is a row that matches the query, reject
          callback(new Error('username or email already exists', null));
        } else {
          //no rows match the query - the fields are unique
          callback(null, true);
        }
      }
    });
  },
}
