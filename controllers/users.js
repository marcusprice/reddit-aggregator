const Users = require('../models/db/Users');
const hash = require('password-hash');
const tools = require('../lib/tools');
const helpers = require('../lib/helpers');

module.exports = {
  getUser: (handle) => {
    return new Promise((resolve, reject) => {
      Users.readUser(handle, (error, result) => {
        if(error) {
          resolve(error);
        } else {
          resolve(result);
        }
      });
    });
  },

  validatePassword: (handle, password) => {
    return new Promise((resolve, reject) => {
      Users.readPassword(handle, (error, result) => {
        if(error) {
          resolve(false) 
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

  createUser: (userData) => {
    return new Promise((resolve, reject) => {
      Users.createUser(userData, (error, result) => {
        if(error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  },

  editUser: (userID, userData) => {
    return new Promise((resolve, reject) => {
      Users.updateUser(userID, userData, (error, result) => {
        if(error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  },

  changePassword: (userID, newPassword) => {
    return new Promise((resolve, reject) => {
      Users.updatePassword(userID, newPassword, (error, result) => {
        if(error) {
          reject(error);
        } else {
          resolve(true);
        }
      });
    });
  },

  createTempPassword: (email) => {
    return new Promise((resolve, reject) => {
      //get the user data
      Users.readUser(email, (error, userData) => {
        if(error) {
          //reject w/error
          reject(error);
        } else {
          //now generate a new password
          let tempPassword = tools.generateRandomString(6);
          //update db with new password
          Users.updatePassword(userData.userid, tempPassword, async (error, result) => {
            if(!error) {
              //send user an email with the temp password
              await helpers.sendPasswordEmail(userData, tempPassword);
              //resolve true value
              resolve(result);
            } else {
              //reject w/error
              reject(error);
            }
          });
        }
      });
    });
  }
};
