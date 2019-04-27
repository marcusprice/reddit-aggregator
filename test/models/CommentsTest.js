const Reports = require('../../models/Comments');
const expect = require('chai').expect;

describe('Comments', () => {

  describe('Comments.createComment()', () => {
    it('should return true upon successful insert');
    it('should return an error if the input has too many fields');
    it('should return an error if the unput has too little fields');
    it('should return an error if the input has an invalid field');
  });


  describe('Comments.readComment()', () => {
    it('should return an object with input of a ReportID');
    it('should return an error if no rows are found');
    it('should return an error if the input is not a number or string');
  });


  describe('Comments.updateComment()', () => {
    it('should return true upon successful update');
    it('should return an error if the input has too many fields');
    it('should return an error if the unput has too little fields');
    it('should return an error if the input has an invalid field');
  });


  describe('Comments.deleteComment()', () => {
    it('should return true upon successful update');
    it('should return an error if the input is not a number or string');
  });

});
