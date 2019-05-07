DROP DATABASE IF EXISTS RedditAggregatorDev;
CREATE DATABASE RedditAggregatorDev;

CREATE TABLE Users (
  UserID SERIAL NOT NULL PRIMARY KEY,
  Username VARCHAR(255),
  Email VARCHAR(255),
  Password VARCHAR(255),
  FirstName VARCHAR(255),
  LastName VARCHAR(255),
  DateCreated TIMESTAMP,
  LastLogin TIMESTAMP
);

CREATE TABLE Reports (
  ReportID SERIAL NOT NULL PRIMARY KEY,
  UserID SERIAL REFERENCES Users ON DELETE CASCADE,
  Name VARCHAR(255),
  Description VARCHAR(255),
  DateCreated TIMESTAMP,
  LastEdit TIMESTAMP,
  Notifications boolean
);

CREATE TABLE Subreddits (
  SubredditID SERIAL NOT NULL PRIMARY KEY,
  SubredditName VARCHAR(255)
);

CREATE TABLE ReportsSubreddits (
  ReportsSubredditsID SERIAL NOT NULL PRIMARY KEY,
  ReportID SERIAL REFERENCES Reports ON DELETE CASCADE,
  SubredditID SERIAL REFERENCES Subreddits
);

CREATE TABLE Handles (
  HandleID SERIAL NOT NULL PRIMARY KEY,
  Handle VARCHAR(255)
);

CREATE TABLE Submissions (
  SubmissionID SERIAL NOT NULL PRIMARY KEY,
  RedditID VARCHAR(255),
  Title VARCHAR(255),
  URL VARCHAR(255),
  SelfText TEXT,
  Handle INT REFERENCES Handles,
  TimePostedUTC INT,
  Edited INT,
  Upvotes INT,
  Downvotes INT,
  Thumbnail VARCHAR(255)
);

CREATE TABLE SubredditsSubmissions (
  SubredditsSubmissionsID INT NOT NULL PRIMARY KEY,
  SubredditID SERIAL REFERENCES Subreddits,
  SubmissionID SERIAL REFERENCES Submissions
);

CREATE TABLE Comments (
  CommentID SERIAL NOT NULL PRIMARY KEY,
  SubmissionID SERIAL REFERENCES Submissions,
  Handle SERIAL REFERENCES Handles,
  CommentText TEXT,
  DatePosted INT,
  Edits INT,
  Upvotes INT,
  Downvotes INT
);

INSERT INTO Users
(Username, Email, Password, FirstName, LastName, DateCreated, LastLogin)
VALUES ('marcusprice', 'marcusprice88@gmail.com', 'password', 'Marcus', 'Price', now(), now());

INSERT INTO Reports
(UserID, Name, Description, DateCreated, Notifications)
VALUES (1, 'Ask Reddit Report', 'The best ask-reddit posts throughout the day', now(), true);

INSERT INTO Subreddits
(SubredditName)
VALUES ('askreddit');

INSERT INTO ReportsSubreddits
(ReportID, SubredditID)
VALUES (1, 1);
