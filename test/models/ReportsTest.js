const Reports = require('../../models/db/Reports');
const expect = require('chai').expect;

describe('Reports', () => {

  const newValidReportData = {
    userID: 1,
    name: 'My Ask Reddit Report',
    description: 'Gets the best ask-reddit and news threads with nothing about cars',
    notifications: true,
    subreddits: ['askreddit', 'news'],
  };

  const reportDataExtraField = {
    userID: 1,
    name: 'My Ask Reddit Report',
    description: 'Gets the best ask-reddit threads',
    notifications: true,
    subreddits: ['askreddit'],
    extraField: ''
  };

  const reportDataMissingField = {
    userID: 1,
    name: 'My Ask Reddit Report',
    description: 'Gets the best ask-reddit threads',
  };

  const reportDataInvalidField = {
    userID: 1,
    name: 'My Ask Reddit Report',
    description: 'Gets the best ask-reddit threads',
    notifications: true,
    subreddits: ['askreddit'],
    invalidField: '',
  };

  describe('Reports.createReport()', () => {
    it('should return true upon successful insert', (done) => {
      Reports.createReport(newValidReportData, (error, result) => {
        expect(error).to.be.a('null');
        expect(result).to.be.true;
        done();
      });
    });

    it('should return an error if the input has too many fields', (done) => {
      Reports.createReport(reportDataExtraField, (error, result) => {
        expect(error).to.be.an('error');
        expect(result).to.be.a('null');
        done();
      });
    });

    it('should return an error if the unput has too little fields', (done) => {
      Reports.createReport(reportDataMissingField, (error, result) => {
        expect(error).to.be.an('error');
        expect(result).to.be.a('null');
        done();
      });
    });

    it('should return an error if the input has an invalid field', (done) => {
      Reports.createReport(reportDataInvalidField, (error, result) => {
        expect(error).to.be.an('error');
        expect(result).to.be.a('null');
        done();
      });
    });
  });


  describe('Reports.readReport()', () => {
    it('should return an object with input of a ReportID', (done) => {
      Reports.readReport(9, (error, result) => {
        expect(result).to.be.an('object');
        expect(error).to.be.a('null');
        done();
      });
    });

    it('should return an error if no rows are found', (done) => {
      Reports.readReport(1000000, (error, result) => {
        expect(error).to.be.an('error');
        expect(result).to.be.a('null');
        done();
      });
    });

    it('should return an error if the input is not a number or string', (done) => {
      Reports.readReport({}, (error, result) => {
        expect(error).to.be.an('error');
        expect(result).to.be.a('null');
        done();
      });
    });
  });

  describe('Reports.readAllReportsByUser()', () => {
    it('should return an array of objects with input of a UserID', (done) => {
      Reports.readAllReportsByUser(1, (error, result) => {
        expect(result).to.be.an('array');
        expect(error).to.be.a('null');
        done();
      });
    });

    it('should return an error if no rows are found', (done) => {
      Reports.readAllReportsByUser(1000000, (error, result) => {
        expect(error).to.be.an('error');
        expect(result).to.be.a('null');
        done();
      });
    });

    it('should return an error if the input is not a number or string', (done) => {
      Reports.readAllReportsByUser({}, (error, result) => {
        expect(error).to.be.an('error');
        expect(result).to.be.a('null');
        done();
      });
    });
  });


  describe('Reports.updateReport()', () => {
    it('should return true upon successful update', (done) => {
      Reports.updateReport(3, {
        name: 'My Ask Reddit Report',
        description: 'Gets the best ask-reddit threads',
        notifications: true,
        subreddits: ['maxmsp', 'askreddit', 'showerthoughts']
      }, (error, result) => {
        expect(error).to.be.a('null');
        expect(result).to.be.true;
        done();
      });
    });

    it('should return an error if the input has too many fields', (done) => {
      Reports.updateReport(3, {
        name: 'Ask Reddit Report',
        extraField: '',
        description: 'Gets the best ask-reddit threads',
        notifications: true,
        subreddits: ['maxmsp', 'askreddit', 'showerthoughts']
      }, (error, result) => {
        expect(error).to.be.an('error');
        expect(result).to.be.a('null');
        done();
      });
    });

    it('should return an error if the unput has too little fields', (done) => {
      Reports.updateReport(3, {
        extraField: '',
        description: 'Gets the best ask-reddit threads',
        subreddits: 'askreddit',
        notifications: true
      }, (error, result) => {
        expect(error).to.be.an('error');
        expect(result).to.be.a('null');
        done();
      });
    });

    it('should return an error if the input has an invalid field', (done) => {
      Reports.updateReport(3, {
        name: 'My Ask Reddit Report',
        invalidField: 'Gets the best ask-reddit threads',
        notifications: true
      }, (error, result) => {
        expect(error).to.be.an('error');
        expect(result).to.be.a('null');
        done();
      });
    });
  });


  describe('Reports.deleteReport()', () => {
    it('should return true upon successful delete', (done) => {
      Reports.deleteReport(1, (error, result) => {
        expect(error).to.be.a('null');
        expect(result).to.be.true;
        done();
      });
    });

    it('should return an error if the input is not a number or string', (done) => {
      Reports.deleteReport({}, (error, result) => {
        expect(error).to.be.an('error');
        expect(result).to.be.a('null');
        done();
      });
    });
  });

})
