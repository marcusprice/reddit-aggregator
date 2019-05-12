const Handles = require('../models/db/Handles');

module.exports = {
  getHandle: (handleID) => {
    return new Promise((resolve, reject) => {
      Handles.readHandle(handleID, (error, result) => {
        if(error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  }
}
