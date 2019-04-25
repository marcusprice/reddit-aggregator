const pg = require('./pg');
const validation = require('../lib/validation');

module.exports = {
  createUser: (userData) => {
    //return a promise
    return new Promise((resolve, reject) => {
      //create output variable
      let output = {error: null, result: null};

      //test input data
      const possibleKeys = ['username', 'email', 'password', 'firstName', 'lastName'];
      output.error = validation.validateInputData(userData, possibleKeys);

      if(output.error) {
        //if there was was a validation error
        reject(output.error);
      } else {
        //verify that handle is unique
        module.exports.verifyUniqueHandle(userData, 'createUser')
        .then(() => {
          //handle is unique, okay to continue on
          //build sql query
          const sql = 'INSERT INTO Users ' +
          '(Username, Email, Password, FirstName, LastName, DateCreated, LastLogin) ' +
          'VALUES ($1, $2, $3, $4, $5, now(), now());';

          //store the input values into an array
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
              reject(err);
            } else {
              //send back a true value signifying successful db entry
              resolve(true);
            }
          });
        })
        .catch((err) => {
          reject(err);
        });
      }
    });
  },

  readUser: () => {

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
          reject(new Error('username or email already exists'));
        } else {
          //no rows match the query - the fields are unique
          resolve();
        }
      }
    });
  });
},
}
