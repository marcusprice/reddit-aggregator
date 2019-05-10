const Subreddits = require('../models/db/Subreddits');
const Reddit = require('../models/api/Reddit');
const Submissions = require('../models/db/Submissions');
const tools = require('./tools');

const getSubmissions = async () => {
  //first get a list of all the subreddits
  let subredditList = await new Promise((resolve) => {
    Subreddits.readAllSubreddits((error, result) => {
      resolve(result);
    });
  });

  //now loop through each subreddit and get the top submission
  await tools.asyncForEach(subredditList, async (subreddit, index) => {
    let topSubmission = await new Promise((resolve) => {
      Reddit.getTopSubmission(subreddit.subredditname, (error, result) => {
        if(!error) {
          resolve(result);
        }
      });
    });

    //if the submission hasn't been edited we need to send a null value
    let edited = topSubmission.timePostedUTC;
    if(!edited) {
      //edited has false value, send in a null value
      edited = null;
    }

    //if there is no thumbnail url send a null value (common with self posts)
    let thumbnail = topSubmission.thumbnail;
    if(thumbnail == 'self' || thumbnail == '') {
      thumbnail = null;
    }

    //put the data together for submission creation
    let submissionData = {
      redditID: topSubmission.redditID,
      title: topSubmission.title,
      url: topSubmission.url,
      handle: topSubmission.posterHandle,
      selfText: topSubmission.selfText,
      submissionTimePostedUTC: topSubmission.timePostedUTC,
      submissionEdited: edited,
      submissionUpvotes: topSubmission.upvotes,
      submissionDownvotes: topSubmission.downvotes,
      thumbnailURL: thumbnail
    };

    //save the data into the db
    await new Promise((resolve) => {
       Submissions.createSubmission(submissionData, subreddit.subredditname, (error, result) => {
         resolve(result);
       });
    });

  });
};

getSubmissions();
