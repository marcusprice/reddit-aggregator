module.exports = {
  //returns an error if there isn't the right amount of keys or if an invalid key is entered
  validateInputData: (inputData, possibleKeys) => {
    //create output variable
    let output = null;
    //save newUserData properties into an array
    const inputDataArray = Object.keys(inputData);
    //make sure the newUserData has all the required fields
    if(inputDataArray.length !== possibleKeys.length) {
      output = new Error('too many or too little fields');
    }

    //loop through entered data
    inputDataArray.forEach((value) => {
      if(!possibleKeys.includes(value)) {
        //if the value in the array is not a possible key
        output = new Error('"' + value + '" is not a valid field');
      }
    });

    //return object
    return output;
  }
}
