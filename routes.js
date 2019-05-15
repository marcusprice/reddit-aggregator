const users = require('./controllers/users');
const tools = require('./lib/tools');
const helpers = require('./lib/helpers');

module.exports = (app) => {
  //logs user on, gets all the data etc.
  app.get('/api/v1/checkLoginStatus', (req, res) => {
    res.json({loggedIn: false});
  });

  app.post('/api/v1/createUser', async (req, res) => {
    let result = users.createUser(req.body);
    if(result) {
      res.json({userCreated: true});
    } else {
      res.json({userCreated: false});
    }
  });

  app.get('/api/v1/login', async (req, res) => {
    //first verify the user's password
    const handle = req.query.handle;
    const password = req.query.password;
    const validated = await users.validatePassword(handle, password);

    if(validated) {
      //get all of the user's data
      let output = await helpers.getAllData(handle);
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
