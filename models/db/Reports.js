const pg = require('./pg');
const validation = require('../../lib/validation');
const tools = require('../../lib/tools');

module.exports = {
  createReport: async (reportData, callback) => {
    //validate input data
    const possibleKeys = [
      'userID',
      'name',
      'description',
      'notifications',
      'subreddits',
    ];
    const validationError = validation.validateInputData(reportData, possibleKeys);

    if(validationError) {
      //there input is invalid, send back an error
      callback(validationError, null);
    } else {
      //input was fine, continue on
      //sql for the standard report data
      const reportSQL = 'INSERT INTO Reports ' +
      '(UserID, Name, Description, DateCreated, LastEdit, Notifications) ' +
      'VALUES ($1, $2, $3, now(), null, $4) RETURNING ReportID;';

      //save report values into an array
      const reportValues = [
        reportData.userID,
        reportData.name,
        reportData.description,
        reportData.notifications
      ];

      //first enter initial report data into reports table
      let result = await pg.query(reportSQL, reportValues);

      //save the report ID into a variable
      let reportID = result.rows[0].reportid;
      //loop through the subreddits in the input array and save them in the subreddits table
      await tools.asyncForEach(reportData.subreddits, async (subreddit) => {
        //first check if subreddit is already in subreddits table
        let subredditValues = [subreddit.toLowerCase()];
        let subredditResult = await pg.query('SELECT SubredditID FROM Subreddits WHERE SubredditName = $1;', subredditValues);

        let subredditID;
        if(subredditResult.rowCount > 0) {
          //subreddit already exists, get it's ID
          subredditID = subredditResult.rows[0].subredditid;
        } else {
          //new subreddit, save it into the db
          subredditResult = await pg.query('INSERT INTO Subreddits (SubredditName) VALUES ($1) RETURNING SubredditID;', subredditValues);
          subredditID = subredditResult.rows[0].subredditid;
        }

        //now insert into the ReportsSubreddits table
        let reportsSubredditsValues = [reportID, subredditID];
        await pg.query('INSERT INTO ReportsSubreddits (ReportID, SubredditID) VALUES ($1, $2)', reportsSubredditsValues);
      });

      callback(null, true);
    }
  },

  readReport: async (reportID, callback) => {
    if(typeof(reportID) !== 'number') {
      const error = new Error('the input was not a number');
      callback(error, null);
    } else {
      const sql = 'SELECT * FROM Reports WHERE ReportID = $1';
      const values = [reportID];

      let output = {};

      //first get the basic report data
      let result = await pg.query(sql, values);
      if(result.rowCount > 0) {
        //report data was found, save it into the output variable
        output = result.rows[0];
        //set blank subreddits array
        output.subreddits = [];

        let reportValues = [reportID];
        let subredditSQL = 'SELECT Subreddits.SubredditName ' +
        'FROM Subreddits ' +
        'LEFT JOIN ReportsSubreddits ' +
        'ON Subreddits.SubredditID = ReportsSubreddits.SubredditID ' +
        'WHERE ReportsSubreddits.ReportID = $1';

        output.subreddits = await pg.query(subredditSQL, reportValues);
        callback(null, output);
      } else {
        //send back an error
        const error = new Error('no reports with that id');
        callback(error, null);
      }
    }
  },

  readAllReportsByUser: async (userID, callback) => {
    //first verify that the input is a number
    if(typeof(userID) !== 'number') {
      const error = new Error('the input was not a number');
      callback(error, null);
    } else {
      //get all of the user's reports (IDs only)
      const sql = 'SELECT ReportID FROM Reports WHERE UserID = $1';
      const value = [userID];

      //instantiate output variable
      let output = [];
      //run initial query
      let result = await pg.query(sql, value);

      //test if there were results
      if(result.rowCount > 0) {
        //there are reports

        //loop through each report ID to get full report data
        await tools.asyncForEach(result.rows, async (report) => {
          //add each report to the output array
          let fullReport = await new Promise((resolve) => {
            module.exports.readReport(report.reportid, (error, result) => {
              resolve(result);
            });
          })
          output.push(fullReport);
        });

        callback(null, output);
      } else {
        const error = new Error('no reports found');
        callback(error, null);
      }
    }
  },

  updateReport: async (reportID, reportData, callback) => {
    //set possible keys array for validation
    const possibleKeys = [
      'name',
      'description',
      'notifications',
      'subreddits',
    ];

    //check for input validation error
    const validationError = validation.validateInputData(reportData, possibleKeys);
    if(validationError) {
      //there was a validation error, send it back
      callback(validationError, null);
    } else {
      //input is fine, continue on
      //sql to update the reports table
      const reportSQL = 'UPDATE Reports ' +
      'SET Name = $1, Description = $2, Notifications = $3 ' +
      'WHERE ReportID = $4;';
      const reportValues = [
        reportData.name,
        reportData.description,
        reportData.notifications,
        reportID
      ];

      //update the reports table
      let reportResult = await pg.query(reportSQL, reportValues);
      if(reportResult.rowCount < 1) {
        //send error and return to controlling function
        const error = new Error('no report with that ID');
        callback(error, null);
        return;
      }

      //now check for differences with subreddit array
      const subredditSelectSQL = 'SELECT Subreddits.SubredditID, Subreddits.SubredditName ' +
      'FROM Subreddits ' +
      'LEFT JOIN ' + 'ReportsSubreddits ' +
      'ON Subreddits.SubredditID = ReportsSubreddits.SubredditID ' +
      'WHERE ReportsSubreddits.ReportID = $1;';
      const subredditSelectValues = [reportID];

      //run db query to get currently stored subreddits
      const subredditResult = await pg.query(subredditSelectSQL, subredditSelectValues);

      //collector arrays
      let storedSubredditNames = [];
      let removedSubreddits = [];
      let newSubreddits = [];

      //collect removed subreddits
      subredditResult.rows.forEach((object) => {
        storedSubredditNames.push(object.subredditname);
        if(!reportData.subreddits.includes(object.subredditname)) {
          removedSubreddits.push(object.subredditid);
        }
      });

      //collect added subreddits
      for(let i = 0; i < reportData.subreddits.length; i++) {
        let newSubreddit = reportData.subreddits[i];
        //use the array we created to test the new subreddit data
        if(!storedSubredditNames.includes(newSubreddit)) {
          //found a subreddit that wasn't previously stored, add it to newSubreddits array
          newSubreddits.push(newSubreddit);
        }
      }

      //test if there are any subreddits that the user removed
      if(removedSubreddits.length > 0) {
        //now remove all subreddit relations in linking table
        await tools.asyncForEach(removedSubreddits, async (subredditID) => {
          let reportsSubredditsValues = [reportID, subredditID];
          await pg.query('DELETE FROM ReportsSubreddits WHERE ReportID = $1 AND SubredditID = $2;', reportsSubredditsValues);
        });
      }

      //test if the user added any new subreddits
      if(newSubreddits.length > 0) {
        //now add all new subreddits to the linking table
        await tools.asyncForEach(newSubreddits, async (subreddit) => {
          //first see if the subreddit already exists in the subreddits table
          let subredditValues = [subreddit.toLowerCase()];
          let subredditResult = await pg.query('SELECT SubredditID FROM Subreddits WHERE SubredditName = $1', subredditValues);

          if(subredditResult.rowCount > 0) {
            //if subreddit exists already, add it to the linking table
            let reportsSubredditValues = [reportID, subredditResult.rows[0].subredditid];
            await pg.query('INSERT INTO ReportsSubreddits (ReportID, SubredditID) VALUES ($1, $2);', reportsSubredditValues);
          } else {
            //new subreddit, add it to subreddits table
            let subredditResult = await pg.query('INSERT INTO Subreddits (SubredditName) VALUES ($1) RETURNING SubredditID;', subredditValues);
            //now add it to the linking table
            let reportsSubredditValues = [reportID, subredditResult.rows[0].subredditid];
            await pg.query('INSERT INTO ReportsSubreddits (ReportID, SubredditID) VALUES ($1, $2);', reportsSubredditValues);
          }
        });
      }

      callback(null, true);
    }
  },

  deleteReport: (reportID, callback) => {
    if(typeof(reportID) !== 'number') {
      const error = new Error('the input was not a number');
      callback(error, null);
    } else {
      const sql = 'DELETE FROM Reports WHERE ReportID = $1;';
      values = [reportID];

      pg.query(sql, values, (err, result) => {
        if(err) {
          callback(err, null);
        } else {
          callback(null, true);
        }
      });
    }
  }
}
