const reddit = require('./snoowrap');

module.exports = {
  getTopSubmission: (subreddit, callback) => {
    reddit.getSubreddit(subreddit).getTop({time: 'hour'})
    .then((result) => {
      //convert unix timestamp from miliseconds (js standard) to seconds
      let now = Math.floor(Date.now() / 1000);
      //test if more than 1 hour has passed
      if(now - result['0'].created_utc > 3600) {
        //more than 1 hour has passed since last post, do not collect data
        const error = new Error('more than 1 hour has elapsed since the last post');
        callback(error, null);
      } else {
        //there has at least been 1 post in the last hour

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

        //return the top submission
        callback(null, output);
      }
    })
    .catch((error) => {
      callback(error, null);
    });
  }
};
