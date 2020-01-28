const config = require('../config/config');
const reports = require('../controllers/reports');
const subreddits = require('../controllers/subreddits');
const submissions = require('../controllers/submissions');
const comments = require('../controllers/comments');
const handles = require('../controllers/handles');
const tools = require('../lib/tools');
const nodemailer = require('nodemailer');
const emailTemplates = require('./email-templates');

module.exports = {





  //gets all report data (list of subreddits, posts for each subreddit & post handles, comments for each posts & comment handles)
  getAllReportData: (reportID) => {
    return new Promise(async(resolve) => {
      //get the report data
      let reportData = await reports.readReport(reportID);
      reportData.subreddits = [];
      reportData.submissions = [];

      //get the subreddits
      let subredditData = await subreddits.getAllSubredditsByReport(reportID);
      //loop through the subreddit objects returned by the db and add them to the reportData.subreddits array property
      subredditData.forEach((subreddit, index) => {
        reportData.subreddits.push(subreddit.subredditname);
      });

      //now loop through each subreddit and create an array of submissions
      await tools.asyncForEach(reportData.subreddits, async subredditName => {
        //get all the submissions for that subreddit
        let submissionData = await submissions.getAllSubmissionsBySubreddit(subredditName);
        //loop through each submission and add the subreddit name
        await tools.asyncForEach(submissionData, async (submission, submissionIndex) => {
          //add the subreddit name
          submissionData[submissionIndex].subredditname = subredditName;
          //get comments
          let commentData = await comments.getAllCommentsForSubmission(submission.submissionid);

          //add the comments to the submission data
          submissionData[submissionIndex].comments = commentData;
        });


        //add the submission data to the output variable
        reportData.submissions.push(submissionData);
      });
      //return the report data
      resolve(reportData);
    });
  },







  //TODO: make production ready
  sendPasswordEmail: (userData, tempPassword) => {
    console.log('made it here');
    return new Promise(async (resolve) => {
      let transporter = nodemailer.createTransport({
        service: config.email.service,
        auth: {
          user: config.email.username,
          pass: config.email.password
        }
      });

      let info = await transporter.sendMail({
        from: '"Reddit Aggregator" <' + config.email.testAddress + '>', // sender address
        to: config.email.testAddress, // list of receivers
        subject: "Forgotten Password", // Subject line
        html: emailTemplates.forgotPassword(userData.firstname, tempPassword) // html body
      });

      resolve(true);
    });
  }

}
