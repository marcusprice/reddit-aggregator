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
### Cloning Project & Installing Dependencies

To install the environment just open up a terminal window, navigate to the directory you want to keep the repository in and run the following commands:

```
git clone https://github.com/marcusprice/reddit-aggregator.git
cd reddit-aggregator && touch .env && npm i
cd client && npm i
```

This process clones the repository into the current directory, moves into it, creates the .env file for environment variables and installs the backend dependencies. Then it moves into the client directory & installs the frontend dependencies.

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

### Setting up the Database

Next you will need to set up the database. The database used for Reddit Aggregator is [PostgreSQL](https://www.postgresql.org/). If PostgreSQL isn't already installed on your machine you will need to install it and create two new databases: one named "RedditAggregatorDev" (for development) and another "RedditAggregator" (for production).

Once you have your databases created, you will need to grab the [schema file](https://github.com/marcusprice/reddit-aggregator/blob/master/models/db/schema.sql) from the models > db directory. This sql file sets up all the necessary tables for the app to run as well as some input to test with.

Depending on your database management system, you can either import the sql file into the RedditAggregatorDev database directly or copy and paste the code into a sql command input.

### Configuration

At the moment there is not much to the config file - it's just a place to save the environment variables into a config object which is used all throughout the application. The database that is used is determined by the mode. To switch between Development and Production mode the environment variable in the .env file just needs to be set to either "Development" or "Production."

## Development

### Starting the environment
If you don't use it already, I highly recommend the nodemon package which makes development much easier by restarting your server each time you save. It's really helpful in our situation since the backend and frontend are decoupled. You can install this on your machine with the following command:

`npm install nodemon -g`

The client is bootstrapped with [Create-React-App](https://create-react-app.dev/) and is proxied to the backend which is set on port 5000 (if no port environment variable is set). This allows us to make requests to our backend without causing any CORS issues. Because the backend & frontend are separated, it's required to start the server on port 5000 first and then start up create-react-app. If the client is initialized before the backend the browser will log some errors about it.

To start the backend server, open a terminal window and navigate to the root directory of the app and run the following command:

`nodemon app`

This starts the server and each time a change is made nodemon will restart it with the new changes. Next open up another terminal window and navigate to the client directory. When you're in the client directory, run the following command:

`npm run start`

This starts the frontend server and now any changes you make on the backend or frontend will be updated immediately.
