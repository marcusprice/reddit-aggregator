const expect = require('chai').expect;
const Users = require('../../models/db/Users');

let userOneID;

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

  describe('Users.readUser()', () => {
    it('should return an object with user-data with input of a UserID', (done) => {
      Users.readUser(1, (error, result) => {
        expect(error).to.be.a('null');
        expect(result).to.be.an('object');
        expect(result).to.have.property('userid');
        expect(result).to.have.property('username');
        expect(result).to.have.property('email');
        expect(result).to.have.property('firstname');
        expect(result).to.have.property('lastname');
        expect(result).to.have.property('datecreated');
        expect(result).to.have.property('lastlogin');
        done();
      });
    });

    it('should not return a password', (done) => {
      Users.readUser(1, (error, result) => {
        expect(error).to.be.a('null');
        expect(result).to.not.have.property('password');
        done();
      });
    });

    it('should return an object with input of a Username', (done) => {
      Users.readUser('userOne', (error, result) => {
        userOneID = result.userid;
        expect(error).to.be.a('null');
        expect(result).to.be.an('object');
        expect(result).to.have.property('userid');
        expect(result).to.have.property('username');
        expect(result).to.have.property('email');
        expect(result).to.have.property('firstname');
        expect(result).to.have.property('lastname');
        expect(result).to.have.property('datecreated');
        expect(result).to.have.property('lastlogin');
        done();
      });
    });

    it('should return an object with input of a Email', (done) => {
      Users.readUser('marcusprice88@gmail.com', (error, result) => {
        expect(error).to.be.a('null');
        expect(result).to.be.an('object');
        expect(result).to.have.property('userid');
        expect(result).to.have.property('username');
        expect(result).to.have.property('email');
        expect(result).to.have.property('firstname');
        expect(result).to.have.property('lastname');
        expect(result).to.have.property('datecreated');
        expect(result).to.have.property('lastlogin');
        done();
      });
    });

    it('should return an error if no rows are found', (done) => {
      Users.readUser('noUser', (error, result) => {
        expect(error).to.be.an('error');
        expect(result).to.be.a('null');
        done();
      });
    });

    it('should return an error if the input is not a number or string', (done) => {
      Users.readUser({}, (error, result) => {
        expect(error).to.be.an('error');
        expect(result).to.be.a('null');
        done();
      });
    });
  });

  describe('Users.updateUser()', () => {
    it('should return true upon successful update', (done) => {
      Users.updateUser(397, {
        username: 'marcuspriceeeeeeee',
        email: 'marcusprice8888888update@gmail.com',
        firstName: 'Marcus',
        lastName: 'Price'
      }, (error, result) => {
        expect(error).to.be.a('null');
        expect(result).to.be.true;
        done();
      });
    });

    it('should return an error if the input has too many fields', (done) => {
      Users.updateUser(397, extraFieldUserData, (error, result) => {
        expect(error).to.be.an('error');
        expect(result).to.be.a('null');
        done();
      });
    });
    it('should return an error if the input has too little fields', (done) => {
      Users.updateUser(397, missingFieldUserData, (error, result) => {
        expect(error).to.be.an('error');
        expect(result).to.be.a('null');
        done();
      });
    });
    it('should return an error if the input has an invalid field', (done) => {
      Users.updateUser(397, invalidFieldUserData, (error, result) => {
        expect(error).to.be.an('error');
        expect(result).to.be.a('null');
        done();
      });
    });

    it('should return an error if the username already exists', (done) => {
      Users.updateUser(397, notUniqueUsernameData, (error, result) => {
        expect(error).to.be.an('error');
        expect(result).to.be.a('null');
        done();
      });
    });

    it('should return an error if the email already exists', (done) => {
      Users.updateUser(397, notUniqueEmailData, (error, result) => {
        expect(error).to.be.an('error');
        expect(result).to.be.a('null');
        done();
      });
    });
  });

  describe('Users.deleteUser()', () => {
    it('should return true upon successful delete', (done) => {
      Users.deleteUser(userOneID, (error, result) => {
        expect(result).to.be.true;
        done();
      });
    });

    it('should return an error if the user can\'t be found', (done) => {
      Users.deleteUser(100000, (error, result) => {
        expect(error).to.be.an('error');
        done();
      });
    });
  });

  describe('Users.readPassword', () => {
    it('should retrieve a password', (done) => {
      Users.readPassword('marcusprice', (error, result) => {
        expect(result).to.be.a('string');
        expect(error).to.be.a('null');
        done();
      });
    });
  })
});
