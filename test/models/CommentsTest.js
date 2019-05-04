const Comments = require('../../models/db/Comments');
const expect = require('chai').expect;

describe('Comments', () => {

  const validCommentData = {
    submissionID: 1,
    comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent nec lorem quis nunc vehicula rutrum sit amet id sapien. Morbi malesuada, neque sit amet euismod posuere, ligula ipsum finibus mauris, porttitor porta orci dolor ac metus. Cras tincidunt dolor ut sapien tristique, et imperdiet ipsum luctus.',
    edits: 0,
    upvotes: 20,
    downvotes: 5
  };

  const extraFieldCommentData = {
    submissionID: 1,
    comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent nec lorem quis nunc vehicula rutrum sit amet id sapien. Morbi malesuada, neque sit amet euismod posuere, ligula ipsum finibus mauris, porttitor porta orci dolor ac metus. Cras tincidunt dolor ut sapien tristique, et imperdiet ipsum luctus.',
    edits: 0,
    upvotes: 20,
    downvotes: 5,
    extraField: ''
  };

  const missingFieldCommentData = {
    submissionID: 1,
    edits: 0,
    upvotes: 20,
    downvotes: 5,
    extraField: ''
  };

  const foreignFieldCommentData = {
    submissionID: 1,
    edits: 0,
    foreignField: '',
    upvotes: 20,
    downvotes: 5,
    extraField: ''
  };

  describe('Comments.createComment()', () => {
    it('should return true upon successful insert', (done) => {
      Comments.createComment(validCommentData, (error, result) => {
        expect(error).to.be.a('null');
        expect(result).to.be.true;
        done();
      });
    });

    it('should return an error if the input has too many fields', (done) => {
      Comments.createComment(extraFieldCommentData, (error, result) => {
        expect(error).to.be.an('error');
        expect(result).to.be.a('null');
        done();
      });
    });

    it('should return an error if the unput has too little fields', (done) => {
      Comments.createComment(missingFieldCommentData, (error, result) => {
        expect(error).to.be.an('error');
        expect(result).to.be.a('null');
        done();
      });
    });

    it('should return an error if the input has an invalid field', (done) => {
      Comments.createComment(foreignFieldCommentData, (error, result) => {
        expect(error).to.be.an('error');
        expect(result).to.be.a('null');
        done();
      });
    });
  });


  describe('Comments.readComment()', () => {
    it('should return an object with input of a ReportID', (done) => {
      Comments.readComment(1, (error, result) => {
        expect(error).to.be.a('null');
        expect(result).to.be.an('object');
        done();
      });
    });

    it('should return an error if no rows are found', (done) => {
      Comments.readComment(1000000, (error, result) => {
        expect(error).to.be.an('error');
        expect(result).to.be.a('null');
        done();
      });
    });

    it('should return an error if the input is not a number', (done) => {
      Comments.readComment({}, (error, result) => {
        expect(error).to.be.an('error');
        expect(result).to.be.a('null');
        done();
      });
    });
  });


  describe('Comments.updateComment()', () => {
    it('should return true upon successful update', (done) => {
      Comments.updateComment(1, {
        comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent nec lorem quis nunc vehicula rutrum sit amet id sapien. Morbi malesuada, neque sit amet euismod posuere, ligula ipsum finibus mauris, porttitor porta orci dolor ac metus. Cras tincidunt dolor ut sapien tristique, et imperdiet ipsum luctus.',
        edits: 0,
        upvotes: 20,
        downvotes: 5
      }, (error, result) => {
        expect(error).to.be.a('null');
        expect(result).to.be.true;
        done();
      });
    });

    it('should return an error if the input has too many fields', (done) => {
      Comments.updateComment(1, extraFieldCommentData, (error, result) => {
        expect(error).to.be.an('error');
        expect(result).to.be.a('null');
        done();
      });
    });

    it('should return an error if the input has too little fields', (done) => {
      Comments.updateComment(1, missingFieldCommentData, (error, result) => {
        expect(error).to.be.an('error');
        expect(result).to.be.a('null');
        done();
      });
    });
    it('should return an error if the input has an invalid field', (done) => {
      Comments.updateComment(1, foreignFieldCommentData, (error, result) => {
        expect(error).to.be.an('error');
        expect(result).to.be.a('null');
        done();
      });
    });
  });


  describe('Comments.deleteComment()', () => {
    it('should return true upon successful delete', (done) => {
      Comments.deleteComment(2, (error, result) => {
        expect(error).to.be.a('null');
        expect(result).to.be.true;
        done();
      });
    });

    it('should return an error if the input is not a number or string', (done) => {
      Comments.deleteComment({}, (error, result) => {
        expect(error).to.be.an('error');
        expect(result).to.be.a('null');
        done();
      });
    });
  });

});
