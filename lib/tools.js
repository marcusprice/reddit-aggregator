module.exports = {
  //for handling asynchronous for-each processes
  asyncForEach: async (array, callback) => {
    for(let i = 0; i < array.length; i++) {
      await callback(array[i], i);
    }
  },

  generateRandomString: (stringLength) => {
    let output = '';
    let characters = 'abcdefghijklmnopqrstuvwxwz0123456789';
    for (let i = 0; i < stringLength; i++) {
      output += characters[Math.floor(Math.random() * characters.length)];
    }
    return output;
  }
}
