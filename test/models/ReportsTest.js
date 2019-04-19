const Reports = require('../../models/Reports');
const expect = require('chai').expect;

describe('Reports', () => {

  describe('Reports.createReport()', () => {
    it('should return true upon successful insert');
    it('should return an error if the input has too many fields');
    it('should return an error if the unput has too little fields');
    it('should return an error if the input has an invalid field');
  });


  describe('Reports.readReport()', () => {
    it('should return an object with input of a ReportID');
    it('should return an error if no rows are found');
    it('should return an error if the input is not a number or string');
  });


  describe('Reports.updateReport()', () => {
    it('should return true upon successful update');
    it('should return an error if the input has too many fields');
    it('should return an error if the unput has too little fields');
    it('should return an error if the input has an invalid field');
  });


  describe('Reports.deleteReport()', () => {
    it('should return true upon successful update');
    it('should return an error if the input is not a number or string');
  });

})