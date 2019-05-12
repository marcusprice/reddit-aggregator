const users = require('./controllers/users');
const reports = require('./controllers/reports');
const subreddits = require('./controllers/subreddits');
const submissions = require('./controllers/submissions');
const handles = require('./controllers/handles');
const tools = require('./lib/tools');

module.exports = (app) => {
  //logs user on, gets all the data etc.
  app.get('/api/v1/login', async (req, res) => {
    //first verify the user's password
    const handle = req.query.handle;
    const password = req.query.password;
    const validated = await users.validatePassword(handle, password);

    if(validated) {
      //get all of the user's data
      let output = await getAllData(handle);
      res.json(output);
    } else {
      //send back error status
      res.send('passwords didn\'t match');
    }
  });

  app.get('/', (req, res) => {
    res.send('public/index.html');
  });
}

const getAllData = (handle) => {
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
      await tools.asyncForEach(output.reports[reportIndex].subreddits, async (subredditName, index) => {
        //create a property with the subreddit name

        console.log(output.reports[reportIndex].submissions)

        //get all the submissions for that subreddit
        let submissionData = await submissions.getAllSubmissionsBySubreddit(subredditName);
        //loop through each submission and add the subreddit & handle name

        await tools.asyncForEach(submissionData, async (submission, index) => {
          //get the handle name
          let handleName = await handles.getHandle(submission.handleid);
          submissionData[index].handlename = handleName;
          submissionData[index].subredditname = subredditName;
        });

        output.reports[reportIndex].submissions.push(submissionData);
      });
    });

    resolve(output);
  });
}
