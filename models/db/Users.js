const hash = require('password-hash');
const pg = require('./pg');
const validation = require('../../lib/validation');

module.exports = {
  createUser: (userData, callback) => {
    //test input data
    const possibleKeys = ['username', 'email', 'password', 'firstName', 'lastName'];
    const validationError = validation.validateInputData(userData, possibleKeys);

    if(validationError) {
      //there was an issue with the input data - send back the error
      callback(validationError, null);
    } else {
      //verify that the handle is unique
      module.exports.verifyUniqueHandle(userData, 'createUser')
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
            hash.generate(userData.password),
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

  readUser: (handle, callback) => {
    if(typeof(handle) !== 'string' && typeof(handle) !== 'number') {
      const error = new Error('input was not a string or number');
      callback(error, null);
    } else {
      //start sql query
      let sql = 'SELECT UserID, Username, Email, FirstName, LastName, LastLogin, DateCreated FROM Users ';
      //determine if the input is a number or string
      if(typeof(handle) == 'number') {
        //input is a number
        sql += 'WHERE UserID = $1';
      } else {
        //input is a string
        sql += 'WHERE Username = $1 OR Email = $1';
      }

      const values = [handle];

      pg.query(sql, values, (err, result) => {
        if(err) {
          callback(err, null);
        } else {
          if(result.rows.length < 1) {
            const error = new Error('no results found');
            callback(error, null)
          } else {
            callback(null, result.rows[0]);
          }
        }
      });
    }
  },

  readPassword: (handle, callback) => {
    const sql = 'SELECT Password FROM Users WHERE Username = $1 OR Email = $1;'
    const values = [handle];

    pg.query(sql, values, (err, result) => {
      if(err) {
        callback(err, null);
      } else {
        if(result.rows.length < 1) {
          const error = new Error('handle was not found');
          callback(error, null);
        } else {
          callback(null, result.rows[0].password);
        }
      }
    });
  },

  updateUser: (userID, updatedUserData, callback) => {
    //test input data
    const possibleKeys = ['username', 'email', 'firstName', 'lastName'];
    const validationError = validation.validateInputData(updatedUserData, possibleKeys);

    if(validationError) {
      //there was an issue with the input data - send back an error
      callback(validationError, null);
    } else {
      //verify that the handle is unique
      module.exports.verifyUniqueHandle(updatedUserData, 'updateUser', userID)
        .then(() => {
          //handles are unique, okay to update user
          //build sql query
          const sql = 'UPDATE Users SET Username = $1, Email = $2, FirstName = $3, LastName = $4, LastLogin = now() WHERE UserID = $5;';

          const values = [
            updatedUserData.username,
            updatedUserData.email,
            updatedUserData.firstName,
            updatedUserData.lastName,
            userID
          ];

          pg.query(sql, values, (err, result) => {
            if(err) {
              callback(err, null);
            } else {
              callback(null, true);
            }
          });
        })
        .catch((err) => {
          callback(err, null);
        });
    }
  },

  updatePassword: (userID, newPassword, callback) => {
    const sql = 'UPDATE Users SET Password = $1 WHERE UserID = $2';
    const values =[hash.generate(newPassword), userID];
    pg.query(sql, values, (err, result) => {
      if(err) {
        callback(err, null);
      } else {
        callback(null, true);
      }
    });
  },

  deleteUser: (userID, callback) => {
    //build sql command
    const sql = 'DELETE FROM Users WHERE UserID = $1';
    const values = [userID];

    //run db query
    pg.query(sql, values, (err, result) => {
      if(err) {
        //if there is a db error return it
        callback(err, null);
      } else {
        //no db error
        if(result.rows.length < 1) {
          //nothing matched, return an error
          const error = new Error('No user found with that ID');
          callback(error, true);
        } else {
          //record deleted, send back true
          callback(null, true);
        }
      }
    });
  },

  verifyUniqueHandle: (newUserData, operation, userid = null) => {
    //return a promise
    return new Promise((resolve, reject) => {
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
          reject(err);
        } else {
          //if there is no error
          if(res.rows.length > 0) {
            //there is a row that matches the query, reject
            reject(new Error('username or email already exists'));
          } else {
            //no rows match the query - the fields are unique
            resolve();
          }
        }
      });
    });
  }
}
