/**
 * Subreddit Routes
 * @module subredditRoutes
 */

const subreddits = require('../controllers/subreddits');

/**
 * Enpoint for getting a list of all stored subreddits
 * @param {object} app - instance of express
 */
module.exports = (app) => {

  /**
   * Get Subreddits
   * Endpoint to collect all subreddits (used for auto-suggestion when creating or editing a report)
   * @param {object} req - the express request object
   * @param {object} res - the express response object
   * @return {string/json} - subreddit data
   */

  app.get('/getSubreddits', async (req, res) => {
    if(req.session.loggedIn && req.session.userID) {  //user is logged in
      //get all subreddit names and send to the client
      const subredditData = await subreddits.getAllSubreddits();
      res.json(subredditData);
    } else {  //user is not logged in
      //send failure notice
      res.json({result: 'failed', reason: 'not logged in'});
    }
  });
};
