const subreddits = require('../controllers/subreddits');

module.exports = (app) => {
  app.get('/getSubreddits', async (req, res) => {
    const subredditData = await subreddits.getAllSubreddits();
    res.json(subredditData);
  });
};
