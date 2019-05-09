// const users = require('../../controllers/users');
// const expect = require('chai').expect;
//
// describe('users', () => {
//   describe('users.verifyPassword', () => {
//     it('should return true if passwords match with username input', (done) => {
//       users.verifyPassword('marcusprice', 'password', (error, result) => {
//         expect(result).to.be.true;
//         expect(error).to.be.a('null');
//         done();
//       });
//     });
//
//     it('should return true if passwords match with email input', (done) => {
//       users.verifyPassword('marcusprice88@gmail.com', 'password', (error, result) => {
//         expect(result).to.be.true;
//         expect(error).to.be.a('null');
//         done();
//       });
//     });
//
//     it('should return false if passwords don\'t match', (done) => {
//       users.verifyPassword('marcusprice', 'PASSWORD', (error, result) => {
//         expect(result).to.be.false;
//         expect(error).to.be.a('null');
//         done();
//       });
//     });
//   });
//
//   describe('users.getAllData', () => {
//     it('should return an object', (done) => {
//       users.getAllData('marcusprice');
//     });
//   });
// });
