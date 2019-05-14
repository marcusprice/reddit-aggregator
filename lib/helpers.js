const users = require('../controllers/users');
const reports = require('../controllers/reports');
const subreddits = require('../controllers/subreddits');
const submissions = require('../controllers/submissions');
const comments = require('../controllers/comments');
const handles = require('../controllers/handles');
const tools = require('../lib/tools');

module.exports = {
  //gets everything for the user
  getAllData: (handle) => {
    return new Promise(async (resolve) => {
      //start output variable with user info
      let output = await users.getUser(handle);
      //save the user's reports into the reports property
      output.reports = await reports.getAllReportsByUser(output.userid);

      //now loop through each report
      await tools.asyncForEach(output.reports, async (report, reportIndex) => {
        //create accumulators for subreddits and submissions
        output.reports[reportIndex].subreddits = [];
        output.reports[reportIndex].submissions = [];

        //save the subreddits
        let subredditData = await subreddits.getAllSubredditsByReport(report.reportid);

        //loop through the subreddits and add them to the subreddits property
        subredditData.forEach((subredditObject, index) => {
          output.reports[reportIndex].subreddits.push(subredditObject.subredditname);
        });

        //now loop through each subreddit and create an array of submissions
        await tools.asyncForEach(output.reports[reportIndex].subreddits, async (subredditName) => {
          //create a property with the subreddit name

          //get all the submissions for that subreddit
          let submissionData = await submissions.getAllSubmissionsBySubreddit(subredditName);

          //loop through each submission and add the subreddit & handle name
          await tools.asyncForEach(submissionData, async (submission, submissionIndex) => {
            //get the handle name
            let submissionHandleName = await handles.getHandle(submission.handleid);
            submissionData[submissionIndex].handlename = submissionHandleName;
            submissionData[submissionIndex].subredditname = subredditName;

            //get comments
            let commentData = await comments.getAllCommentsForSubmission(submission.submissionid);
            //loop through the comments and get the handle
            await tools.asyncForEach(commentData, async (comment, commentIndex) => {
              commentData[commentIndex].handlename = await handles.getHandle(comment.handleid);
            });

            //add the comments to the submission data
            submissionData[submissionIndex].comments = commentData;
          });


          //add the submission data to the output variable
          output.reports[reportIndex].submissions.push(submissionData);
        });
      });

      resolve(output);
    });
  }

}
