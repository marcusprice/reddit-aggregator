# Reddit Aggregator

[Live Example](https://marcusprice-reddit-aggregator.glitch.me/)

## About

Reddit Aggregator is a CRUD app that collects the top [Reddit](https://www.reddit.com) submissions of the hour so interesting posts don't get buried. It was a built for my capstone project class and I used it as an opportunity to become more accustomed to asynchronous JavaScript, automated processes with cron, test driven development, and integrating 3rd party REST api's into an application.

It's built in the MVC (model-view-controller) design pattern, separating concerns between the backend/data layer and the client. The backend is managed with the Express framework & PostgreSQL and the client is built with the React framework (via [Create React App](https://create-react-app.dev/)) & React-Bootstrap.

## Dependencies

### Backend Dependencies
* Express (+ body-parser & express-session)
* dotenv
* Snoowrap (Reddit api)
* Password Hash
* Nodemailer
* pg (PostgreSQL)
* Mocha.js
* Chai.js

### Frontend Dependencies
* React
* React-Bootstrap
* Immutable.js

## Installation

There are 5 steps for installing the development environment for Reddit Aggregator:

1. Cloning Project & Installing Dependencies
2. Setting up the Database
3. Setting Up the Reddit API for Snoowrap
4. Setting Environment Variables
5. Setting Up cron to Grab Reddit Data

This section walks you though each of these steps.

### Cloning Project & Installing Dependencies

The first thing you need to do is clone the project and install the dependencies. To do this, open up a terminal window and navigate to the directory you want to keep the repository in. Once you are there run the following 3 commands:

```
git clone https://github.com/marcusprice/reddit-aggregator.git
cd reddit-aggregator && touch .env && npm i
cd client && npm i
```

This process clones the repository into the current directory, moves into it, creates the .env file for environment variables and installs the backend dependencies. Then it moves into the client directory & installs the frontend dependencies.

### Setting up the Database

Next you will need to set up the database. The database used for Reddit Aggregator is [PostgreSQL](https://www.postgresql.org/). If PostgreSQL isn't already installed on your machine you will need to install it and create two new databases: one named "RedditAggregatorDev" (for development) and another "RedditAggregator" (for production).

Once you have your databases created, you will need to grab the [schema file](https://github.com/marcusprice/reddit-aggregator/blob/master/models/db/schema.sql) from the models > db directory. This sql file sets up all the necessary tables for the app to run as well as some input to test with.

Depending on your database management system, you can either import the sql file into the RedditAggregatorDev database directly or copy and paste the code into a sql command input.

### Setting Up the Reddit API for Snoowrap

You will need to set up credentials for the Reddit API so the Snoowrap wrapper can pull data from Reddit using those credentials. There is some literature online that suggests that you need to set up OAUTH to do this, but that is not necessary since this is a script-type app. To do this:

1. Open a web browser and navigate to https://www.reddit.com. Either sign in to your account or create a new account if you don't already have one.
2. Navigate to https://www.reddit.com/prefs/apps and click on the Create an App button at the bottom.
3. Enter "Reddit Aggregator" for the name, **click the radio button that says "script",** enter a short description of what you're doing and lastly a url to your forked version of this repository in both the "url" & "redirect" uri inputs.
4. After you click "create app" a secret client key and a client ID will be produced - make a note of both of these as you will need to enter them as environment variables for the next step of the installation process.
5. You will also need to make up a user agent, which is basically a short description of what the app does. Something like "Grabs the top posts from various subreddits each hour" should be sufficient.

[More info on the Reddit API](https://www.reddit.com/wiki/api#wiki_reddit_api_access)

[More info on Snoowrap](https://not-an-aardvark.github.io/snoowrap/)

### Setting Environment Variables

Next you need to open the .env file in the app's root directory and add the following environment variables:
```
MODE=Development
DB_HOST={replace with db host address}
DB_USERNAME={replace with db username}
DB_PASSWORD={replace with db password}
REDDIT_USER_AGENT={replace with reddit user agent string}
REDDIT_CLIENT_ID={replace with client id}
REDDIT_CLIENT_SECRET={replace with client secret}
REDDIT_USERNAME={replace with reddit username}
REDDIT_PASSWORD={replace with password}
EMAIL_USERNAME={replace with SMTP username}
EMAIL_PASSWORD={replace with SMTP password}
SESSION_SECRET={replace with session secret key}
```

### Setting Up cron to Grab Reddit Data

The last thing you need to do for the application to be functional is set up a crontab for grabbing reddit posts each hour. Fire up a terminal window and enter the following command:

`crontab -e`

Then enter the following line into the cron configuration file (replacing the path to Reddit Aggregator's actual path):

`0 * * * * /usr/bin/node /path/to/reddit-aggregatorr/bin/reddit-content-grabber.js`

This will set up a cron job which will execute the reddit-content-grabber script every hour on the hour.

## Development

This section is a general breakdown of the development environment, app architecture, testing and suggested workflows for the app.

### Starting the Environment
If you don't use it already, I highly recommend the nodemon package which makes development much easier by restarting your server each time you save. You can install this on your machine with the following command:

`npm install nodemon -g`

The client is bootstrapped with [Create-React-App](https://create-react-app.dev/) and is proxied to the backend which is set on port 5000 (if no port environment variable is set). This allows us to make requests to our backend without causing any CORS issues. Because the backend & frontend are separated, it's required to start the server on port 5000 first and then start up Create-React-App. If the client is initialized before the backend the browser will log some errors about it.

To start the backend server, open a terminal window and navigate to the root directory of the app and run the following command:

`nodemon app`

This starts the server and each time a change is made nodemon will restart it with the new changes. Next open up another terminal window and navigate to the client directory. When you're in the client directory, run the following command:

`npm run start`

This starts the frontend server and now any changes you make on the backend or frontend will be updated immediately.

### App Architecture

#### Model-View-Controller Pattern

Reddit Aggregator follows a MVC pattern, so typically the api request/response cycle goes as follows:

**Fetch Request from Client > Route > Controller > Model > Database**

...then

**Database > Model > Controller > Route > Return Data to Client**

However there are a few exceptions, particularly if a route/endpoint doesn't require serving the client with data beyond a success response (logging out of an account, for example).

#### Backend/Frontend Communication

Since the frontend (via Create-React-App) is a different process ran on a separate port as the backend, the frontend is proxied to the express server to allow http requests while avoiding CORS issues.

Users of the app will make basic CRUD operations to the database through the app interface.
