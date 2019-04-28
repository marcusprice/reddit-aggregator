const Users = require('../models/Users');

module.exports = {
  verifyPassword: (handle, password, callback) => {
    Users.getPassword(handle, (error, result) => {
      if(result === password) {
        //passwords matched
        callback(error, true);
      } else {
        //passwords did not match
        callback(error, false);
      }
    });
  }
}
