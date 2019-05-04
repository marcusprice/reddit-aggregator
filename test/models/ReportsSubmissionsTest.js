describe('ReportsSubmissions', () => {
  describe('ReportsSubmissions.createEntry', () => {
    it('should return true upon succesful insert');
    it('should return an error if the input has too many fields');
    it('should return an error if the unput has too little fields');
    it('should return an error if the input has an invalid field');
  });

  describe('ReportsSubmissions.readAllEntries', () => {
    it('should return an array of objects');
  });

  describe('ReportsSubmissions.readAllSubmissionsByReport', () => {
    it('should return an array of objects');
    it('should return an error if input is not a number');
  });

  describe('ReportsSubmissions.deleteEntry', () => {
    it('should return true upon succesful insert');
    it('should return an error if the input has too many fields');
    it('should return an error if the unput has too little fields');
    it('should return an error if the input has an invalid field');
  });
});
