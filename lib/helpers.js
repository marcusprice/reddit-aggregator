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
    return new Promise(async (resolve) => {
      // Generate test SMTP service account from ethereal.email
      // Only needed if you don't have a real mail account for testing
      let testAccount = await nodemailer.createTestAccount();

      // create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: testAccount.user, // generated ethereal user
          pass: testAccount.pass // generated ethereal password
        }
      });

      // send mail with defined transport object
      let info = await transporter.sendMail({
        from: '"Reddit Aggregator" <reddit-aggregator@aws.com>', // sender address
        to: "marcusprice88@gmail.com", // list of receivers
        subject: "Forgotten Password", // Subject line
        html: emailTemplates.forgotPassword(userData.firstname, tempPassword) // html body
      });

      console.log("Message sent: %s", info.messageId);
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

      // Preview only available when sending through an Ethereal account
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
      resolve();
    });
  }

}
