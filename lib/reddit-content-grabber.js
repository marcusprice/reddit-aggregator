const Reddit = require('../models/api/Reddit');
const Subreddits = require('../models/db/Subreddits');
const Submissions = require('../models/db/Submissions');
const Comments = require('../models/db/Comments');
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
    //save the top submission into a variable
    let topSubmission = await new Promise((resolve) => {
      Reddit.getTopSubmission(subreddit.subredditname, (error, result) => {
        if(!error) {
          resolve(result);
        } else {
          resolve(null);
        }
      });
    });

    if(topSubmission) {
      //if the submission hasn't been edited we need to send a null value
      let edited = topSubmission.edited;
      if(!edited) {
        //edited has false value, send in a null value
        edited = null;
      }

      //if there is no thumbnail-url send a null value (common with self posts)
      let thumbnail = topSubmission.thumbnail;
      if(thumbnail == 'self' || thumbnail == '' || thumbnail == 'default') {
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

      //save the data into the db and get the submission id
      let submissionID = await new Promise((resolve) => {
         Submissions.createSubmission(submissionData, subreddit.subredditname, (error, result) => {
           if(!error) {
             resolve(result);
           } else {
             throw error;
           }
         });
      });

      if(submissionID) {
        //only get comments if the submission was saved (wouldn't if it is a duplicate)
        //now save the top five comments into an array
        let topComments = await new Promise((resolve) => {
          Reddit.getTopComments(submissionData.redditID, (error, result) => {
            if(!error) {
              resolve(result);
            }
          });
        });

        //loop through the comment array and add each comment to the db
        await tools.asyncForEach(topComments, async (commentData, index) => {
          commentData.submissionID = submissionID;
          if(!commentData.edited) {
            commentData.edited = null;
          }
          await new Promise((resolve) => {
            Comments.createComment(commentData, (error, result) => {
              if(!error) {
                resolve(result);
              }
            });
          });
        });
      }
    }
  });
};

getSubmissions();
