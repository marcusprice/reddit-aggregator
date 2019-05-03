const reddit = require('./snoowrap');

module.exports = {
  getTopSubmission: (subreddit, callback) => {
    reddit.getSubreddit(subreddit).getTop({time: 'hour'})
    .then((result) => {
      //save the required data into an object
      const output = {
        redditID: result['0'].id,
        title: result['0'].title,
        url: result['0'].url,
        selfText: result['0'].selftext,
        posterHandle: result['0'].author.name,
        timePostedUTC: result['0'].created_utc,
        edited: result['0'].edited,
        upvotes: result['0'].ups,
        downvotes: result['0'].downs,
        thumbnail: result['0'].thumbnail
      };
      //resolve the top submission
      callback(null, output);
    })
    .catch((error) => {
      callback(error, null);
    });
  }
};
