const Submissions = require('../../models/Submissions');
const expect = require('chai').expect;

describe('Submissions', () => {

  const validSubmissionData = {
    title: 'Submission Title',
    url: 'https://www.google.com',
    posterHandle: 'endlesshappiness',
    upvotes: 20,
    downvotes: 5
  };

  const validSubmissionDataExtraField = {
    title: 'Submission Title',
    url: 'https://www.google.com',
    posterHandle: 'endlesshappiness',
    upvotes: 20,
    downvotes: 5,
    extraField: ''
  };

  describe('Submissions.createSubmission()', () => {
    it('should return true upon successful insert', (done) => {
      Submissions.createSubmission(validSubmissionData, (error, result) => {
        expect(error).to.be.a('null');
        expect(result).to.be.true;
        done();
      });
    });
    it('should return an error if the input has too many fields', (done) => {
      Submissions.createSubmission(validSubmissionDataExtraField, (error, result) => {
        expect(error).to.be.an('error');
        expect(result).to.be.a('null');
        done();
      });
    });
    it('should return an error if the unput has too little fields');
    it('should return an error if the input has an invalid field');
  });

  describe('Submissions.readSubmission()', () => {
    it('should return an object with input of a ReportID');
    it('should return an error if no rows are found');
    it('should return an error if the input is not a number or string');
  });


  describe('Submissions.updateSubmission()', () => {
    it('should return true upon successful update');
    it('should return an error if the input has too many fields');
    it('should return an error if the unput has too little fields');
    it('should return an error if the input has an invalid field');
  });


  describe('Submissions.deleteSubmission()', () => {
    it('should return true upon successful update');
    it('should return an error if the input is not a number or string');
  });

});
