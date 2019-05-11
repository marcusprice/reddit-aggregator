const Users = require('../models/db/Users');
const hash = require('password-hash');

module.exports = {
  validatePassword: (handle, password) => {
    return new Promise((resolve, reject) => {
      Users.readPassword(handle, (error, result) => {
        if(error) {
          reject(error)
        } else {
          if(hash.verify(password, result)) {
            //passwords match
            resolve(true);
          } else {
            //passwords don't match
            resolve(false);
          }
        }
      });
    });
  },

  getUser: (handle) => {
    return new Promise((resolve, reject) => {
      Users.readUser(handle, (error, result) => {
        if(error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  }
};
