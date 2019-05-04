const Submissions = require('../../models/db/Submissions');
const expect = require('chai').expect;

describe('Submissions', () => {

  const validSubmissionData = {
    title: 'Submission Title',
    url: 'https://www.google.com',
    posterHandle: 'endlesshappiness',
    upvotes: 20,
    downvotes: 5
  };

  const submissionDataExtraField = {
    title: 'Submission Title',
    url: 'https://www.google.com',
    posterHandle: 'endlesshappiness',
    upvotes: 20,
    downvotes: 5,
    extraField: ''
  };

  const submissionDataMissingField = {
    title: 'Submission Title',
    url: 'https://www.google.com',
    posterHandle: 'endlesshappiness',
    upvotes: 20,
  };

  const submissionDatainvalidField = {
    title: 'Submission Title',
    url: 'https://www.google.com',
    posterHandle: 'endlesshappiness',
    upvotes: 20,
    invalidField: ''
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
      Submissions.createSubmission(submissionDataExtraField, (error, result) => {
        expect(error).to.be.an('error');
        expect(result).to.be.a('null');
        done();
      });
    });

    it('should return an error if the input has too little fields', (done) => {
      Submissions.createSubmission(submissionDataMissingField, (error, result) => {
        expect(error).to.be.an('error');
        expect(result).to.be.a('null');
        done();
      });
    });

    it('should return an error if the input has an invalid field', (done) => {
      Submissions.createSubmission(submissionDatainvalidField, (error, result) => {
        expect(error).to.be.an('error');
        expect(result).to.be.a('null');
        done();
      });
    });
  });

  describe('Submissions.readSubmission()', () => {
    it('should return an object with input of a ReportID', (done) => {
      Submissions.readSubmission(1, (error, result) => {
        expect(error).to.be.a('null');
        expect(result).to.be.an('object');
        done();
      });
    });

    it('should return an error if no rows are found', (done) => {
      Submissions.readSubmission(10000, (error, result) => {
        expect(error).to.be.an('error');
        expect(result).to.be.a('null');
        done();
      });
    });

    it('should return an error if the input is not a number or string', (done) => {
      Submissions.readSubmission({}, (error, result) => {
        expect(error).to.be.an('error');
        expect(result).to.be.a('null');
        done();
      });
    });
  });

  describe('Submissions.updateSubmission()', () => {
    it('should return true upon successful update', (done) => {
      Submissions.updateSubmission(1, validSubmissionData, (error, result) => {
        expect(error).to.be.a('null');
        expect(result).to.be.true;
        done();
      });
    });

    it('should return an error if the input has too many fields', (done) => {
      Submissions.updateSubmission(1, submissionDataExtraField, (error, result) => {
        expect(error).to.be.an('error');
        expect(result).to.be.a('null');
        done();
      });
    });

    it('should return an error if the unput has too little fields', (done) => {
      Submissions.updateSubmission(1, submissionDataMissingField, (error, result) => {
        expect(error).to.be.an('error');
        expect(result).to.be.a('null');
        done();
      });
    });

    it('should return an error if the input has an invalid field', (done) => {
      Submissions.updateSubmission(1, submissionDatainvalidField, (error, result) => {
        expect(error).to.be.an('error');
        expect(result).to.be.a('null');
        done();
      });
    });
  });


  describe('Submissions.deleteSubmission()', () => {
    it('should return true upon successful delete', (done) => {
      Submissions.deleteSubmission(2, (error, result) => {
        expect(error).to.be.a('null');
        expect(result).to.be.true;
        done();
      });
    });

    it('should return an error if the input is not a number', (done) => {
      Submissions.deleteSubmission({}, (error, result) => {
        expect(error).to.be.an('error');
        expect(result).to.be.a('null');
        done();
      });
    });
  });

});
