const expect = require('chai').expect;
const Users = require('../../models/Users');

let validUserData = {
  username: 'userOne',
  email: 'userOne@users.net',
  password: 'password',
  firstName: 'User',
  lastName: 'One'
};

let extraFieldUserData = {
  username: 'userOne',
  email: 'userOne@users.net',
  password: 'password',
  firstName: 'User',
  lastName: 'One',
  extraField: 'lastName'
};

let missingFieldUserData = {
  username: 'userOne',
  email: 'userOne@users.net',
  password: 'password',
  firstName: 'User'
};

let invalidFieldUserData = {
  username: 'userOne',
  email: 'userOne@users.net',
  password: 'password',
  firstName: 'User',
  invalidField: 'invalidField'
};

let notUniqueUsernameData = {
  username: 'userOne',
  email: 'userOneOne@users.net',
  password: 'password',
  firstName: 'User',
  lastName: 'One'
 };

let notUniqueEmailData = {
  username: 'userOneOne',
  email: 'userOne@users.net',
  password: 'password',
  firstName: 'User',
  lastName: 'One'
};

describe('Users', () => {

  describe('Users.createUser()', () => {
    it('should return true upon successful insertion',  (done) => {
      Users.createUser(validUserData, (error, result) => {
        expect(error).to.be.a('null');
        expect(result).to.be.true;
        done();
      });
    });

    it('should return an error if the input has too many fields', (done) => {
      Users.createUser(extraFieldUserData, (error, result) => {
        expect(error).to.be.an('error');
        expect(result).to.be.a('null');
        done();
      });
    });

    it('should return an error if the input has too little fields', (done) => {
      Users.createUser(missingFieldUserData, (error, result) => {
        expect(error).to.be.an('error');
        expect(result).to.be.a('null');
        done();
      });
    });

    it('should return an error if the input has an invalid field', (done) => {
      Users.createUser(invalidFieldUserData, (error, result) => {
        expect(error).to.be.an('error');
        expect(result).to.be.a('null');
        done();
      });
    });

    it('should return an error if the username already exists', (done) => {
      Users.createUser(notUniqueUsernameData, (error, result) => {
        expect(error).to.be.an('error');
        expect(result).to.be.a('null');
        done();
      });
    });

    it('should return an error if the email already exists',  (done) => {
      Users.createUser(notUniqueEmailData, (error, result) => {
        expect(error).to.be.an('error');
        expect(result).to.be.a('null');
        done();
      });
    });
  });

/*
  describe('Users.readUser()', () => {
    it('should return an object with user-data with input of a UserID', async () => {
      const result = await User.readUser(1);
      expect(result).to.be.an('object');
      expect(result).to.have.property('username');
      expect(result).to.have.property('email');
      expect(result).to.have.property('firstname');
      expect(result).to.have.property('lastname');
      expect(result).to.have.property('datecreated');
      expect(result).to.have.property('lastlogin');
    });

    it('should not return a password', async () => {
      const result = await User.readUser(1);
      expect(result).to.not.have.property('username');
    });

    it('should return an object with input of a Username', async () => {
      const result = await User.readUser('marcusrice');
      expect(result).to.be.an('object');
    });

    it('should return an object with input of a Email', async () => {
      const result = await User.readUser('marcusrice88@gmail.com');
      expect(result).to.be.an('object');
    });

    it('should return an error if no rows are found', async () => {
      const result = await User.readUser('noUser');
      expect(result).to.be.an('error');
    });

    it('should return an error if the input is not a number or string', async () => {
      const result = await User.readUser([1]);
      expect(result).to.be.an('error');
    });
  });

  describe('Users.updateUser()', () => {
    it('should return true upon successful update', async () => {
      //update username & email values to avoid non-unique error
      validUserData.username = 'userOneUpdate';
      validUserData.email = 'userOneUpdate@user.net';

      const result = await Users.updateUser(validUserData);
      expect(result).to.be.true;
    });

    it('should return an error if the input has too many fields', async () => {
      const result = await Users.updateUser(extraFieldUserData);
      expect(result).to.be.an('error');
    });

    it('should return an error if the unput has too little fields');
    it('should return an error if the input has an invalid field');
    it('should return an error if the username already exists');
    it('should return an error if the email already exists');
  });


  describe('Users.deleteUser()', () => {
    it('should return true upon successful update', async () => {
      const result = await Users.deleteUser('userOneUpdate');
      expect(result).to.be.true;
    });

    it('should return an error if the input is not a number or string', async () => {
      const result = await Users.deleteUser({wrong: 'inputype'});
      expect(result).to.be.an('error');
    });
  });

*/
});
