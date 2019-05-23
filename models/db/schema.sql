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
  HandleName VARCHAR(255)
);

CREATE TABLE Submissions (
  SubmissionID SERIAL NOT NULL PRIMARY KEY,
  SubredditID INT REFERENCES Subreddits,
  RedditID VARCHAR(255),
  Title VARCHAR(255),
  URL TEXT,
  SelfText TEXT,
  HandleID INT REFERENCES Handles,
  SubmissionTimePostedUTC INT,
  SubmissionEdited INT,
  SubmissionUpvotes INT,
  SubmissionDownvotes INT,
  ThumbnailURL VARCHAR(255)
);

CREATE TABLE Comments (
  CommentID SERIAL NOT NULL PRIMARY KEY,
  SubmissionID SERIAL REFERENCES Submissions,
  HandleID INT REFERENCES Handles,
  RedditID VARCHAR(255),
  CommentText TEXT,
  DatePosted INT,
  Edits INT,
  Upvotes INT,
  Downvotes INT
);

INSERT INTO Users
(Username, Email, Password, FirstName, LastName, DateCreated, LastLogin)
VALUES (
  'marcusprice',
  'marcusprice88@gmail.com',
  'sha1$c7e1f342$1$b164e85582f94418f3ef0c6412c42fdb55a055e2',
  'Marcus',
  'Price',
  now(),
  now()
);

INSERT INTO Reports
(UserID, Name, Description, DateCreated, Notifications)
VALUES (1, 'Ask Reddit & Shower Thoughts Report', 'Gets my favorite posts', now(), true);

INSERT INTO Reports
(UserID, Name, Description, DateCreated, Notifications)
VALUES (1, 'News & Politics Report', 'Gets my favorite  news & politics stories', now(), true);

INSERT INTO Subreddits
(SubredditName)
VALUES ('askreddit');

INSERT INTO Subreddits
(SubredditName)
VALUES ('showerthoughts');

INSERT INTO Subreddits
(SubredditName)
VALUES ('politics');

INSERT INTO Subreddits
(SubredditName)
VALUES ('news');

INSERT INTO ReportsSubreddits
(ReportID, SubredditID)
VALUES (1, 1);

INSERT INTO ReportsSubreddits
(ReportID, SubredditID)
VALUES (1, 2);

INSERT INTO ReportsSubreddits
(ReportID, SubredditID)
VALUES (2, 3);

INSERT INTO ReportsSubreddits
(ReportID, SubredditID)
VALUES (2, 4);
