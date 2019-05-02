module.exports = {
  //for handling asynchronous for-each processes
  asyncForEach: async (array, callback) => {
    for(let i = 0; i < array.length; i++) {
      await callback(array[i], i);
    }
  }
}
