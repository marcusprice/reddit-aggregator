const pg = require('./pg');
const validation = require('../lib/validation');

module.exports = {
  createUser: (userData, callback) => {
    //test input data
    const possibleKeys = ['username', 'email', 'password', 'firstName', 'lastName'];
    const validationError = validation.validateInputData(userData, possibleKeys);

    if(validationError) {
      //there was an issue with the input data - send back an error
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

  readUser: (identifier, callback) => {
    if(typeof(identifier) !== 'string' && typeof(identifier) !== 'number') {
      const error = new Error('input was not a string or number');
      callback(error, null);
    } else {
      //start sql query
      let sql = 'SELECT UserID, Username, Email, FirstName, LastName, LastLogin, DateCreated FROM Users ';
      //determine if the input is a number or string
      if(typeof(identifier) == 'number') {
        //input is a number
        sql += 'WHERE UserID = $1';
      } else {
        //input is a string
        sql += 'WHERE Username = $1 OR Email = $1';
      }

      const values = [identifier];

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

  updateUser: () => {
    
  },

  deleteUser: () => {

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
            reject(new Error('username or email already exists', null));
          } else {
            //no rows match the query - the fields are unique
            resolve();
          }
        }
      });
    });
  },
}
