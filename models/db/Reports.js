const pg = require('./pg');
const validation = require('../../lib/validation');
const tools = require('../../lib/tools');

module.exports = {
  createReport: (reportData, callback) => {
    //validate input data
    const possibleKeys = [
      'userID',
      'name',
      'description',
      'notifications',
      'subreddits',
      'filteredIn',
      'filteredOut'
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
      pg.query(reportSQL, reportValues)
        .then(async (result) => {
          //then enter subreddits into subreddit table

          //save the report ID into a variable
          let reportID = result.rows[0].reportid;
          //loop through the subreddits in the input array and save them in the subreddits table
          await tools.asyncForEach(reportData.subreddits, async (subreddit) => {
            //first check if subreddit is already in subreddits table
            let subredditValues = [subreddit.toLowerCase()];
            let subredditResult = await pg.query('SELECT SubredditID FROM Subreddits WHERE Subreddit = $1;', subredditValues);

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
        })
        .catch((error) => {
          //send back the error
          callback(error, null);
        });
    }
  },

  readReport: (reportID, callback) => {
    if(typeof(reportID) !== 'number') {
      const error = new Error('the input was not a number');
      callback(error, null);
    } else {
      const sql = 'SELECT * FROM Reports WHERE ReportID = $1';
      const values = [reportID];

      let output = {};
      //first get the basic report data
      pg.query(sql, values)
        .then((result) => {
          if(result.rowCount > 0) {
            //save the data into the output variable
            output = result.rows[0];
            output.subreddits = [];
            output.filteredIn = [];
            output.filteredOut = [];
            let reportValues = [reportID];
            let subredditSQL = 'SELECT Subreddits.SubredditName ' +
            'FROM Subreddits ' +
            'LEFT JOIN ReportsSubreddits ' +
            'ON Subreddits.SubredditID = ReportsSubreddits.SubredditID ' +
            'WHERE ReportsSubreddits.ReportID = $1';
            return pg.query(subredditSQL, reportValues);
          } else {
            const error = new Error('no reports with that id');
            callback(error, null);
          }
        })
        .then((result) => {
          if(result.rowCount > 0) {
            //there were subreddits
            for(let i = 0; i < Object.keys(result.rows).length; i++) {
              //loop through each entry and add the subreddit name to the output
              output.subreddits.push(result.rows[i].subreddit);
            }
          }

          let reportValues = [reportID];
          let subredditSQL = 'SELECT FilteredInFilter.FilteredInFilter ' +
          'FROM FilteredIn ' +
          'LEFT JOIN ReportsFilteredIn ' +
          'ON FilteredIn.FilteredInID = ReportsFilteredIn.FilteredInID ' +
          'WHERE ReportsFilteredIn.ReportID = $1';
          return pg.query(subredditSQL, reportValues);
        })
        .then((result) => {
          if(result.rowCount > 0) {
            //there were subreddits
            for(let i = 0; i < Object.keys(result.rows).length; i++) {
              //loop through each entry and add the subreddit name to the output
              output.filteredIn.push(result.rows[i].filteredin);
            }
          }

          let reportValues = [reportID];
          let subredditSQL = 'SELECT FilteredOut.FilteredOutFilter ' +
          'FROM FilteredOut ' +
          'LEFT JOIN ReportsFilteredOut ' +
          'ON FilteredOut.FilteredOutID = ReportsFilteredOut.FilteredOutID ' +
          'WHERE ReportsFilteredOut.ReportID = $1';
          return pg.query(subredditSQL, reportValues);
        })
        .then((result) => {
          if(result.rowCount > 0) {
            //there were subreddits
            for(let i = 0; i < Object.keys(result.rows).length; i++) {
              //loop through each entry and add the subreddit name to the output
              output.filteredOut.push(result.rows[i].filteredout);
            }
          }
          callback(null, output);
        })
        .catch((error) => {
          callback(error, null);
        });
    }
  },

  readAllReportsByUser: (userID, callback) => {
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
      pg.query(sql, value
      //run initial query)
      .then(async (result) => {
        if(result.rowCount > 0) {
          //there are reports
          await tools.asyncForEach(result.rows, async (report) => {
            //loop through each report & add it to the output array
            let fullReport = await new Promise((resolve, reject) => {
              module.exports.readReport(report.reportid, (error, result) => {
                if(error) {
                  reject(error);
                } else {
                  resolve(result);
                }
              });
            })
            output.push(fullReport);
          });

          callback(null, output);
        } else {
          const error = new Error('no reports found');
          callback(error, null);
        }
      })
      .catch((error) => {
        callback(error, null);
      });
    }
  },

  updateReport: async (reportID, reportData, callback) => {
    const possibleKeys = [
      'name',
      'description',
      'notifications',
      'subreddits',
      'filteredIn',
      'filteredOut'
    ];

    //check for input validation error
    const validationError = validation.validateInputData(reportData, possibleKeys);
    if(validationError) {
      callback(validationError, null);
    } else {
      //input is fine, continue on
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
      await pg.query(reportSQL, reportvalues);

      //now check for differences with subreddit array
      const subredditSelectSQL = 'SELECT Subreddits.SubredditID, Subreddits.SubredditName ' +
      'FROM Subreddits ' +
      'LEFT JOIN ' + 'ReportsSubreddits' +
      'ON Subreddits.SubredditID = ReportsSubreddits.SubredditID ' +
      'WHERE SubredditsReports.ReportID = $1';
      const subredditSelectValues = [reportID];

      //run db query to get currently stored subreddits
      const storedSubreddits = await pg.query(subredditSelectSQL, subredditSelectValues);

      //convert the result values into an array (for testing)
      let storedSubredditsArray = [];
      subredditResults.forEach((value) => {
        storedSubredditsArray.push(value.subredditname);
      });

      //create empty arrays to collect subreddit info
      let removedSubreddits = [];
      let newSubreddits = [];

      storedSubreddits.forEach((value, index) => {
        let storedSubreddit = storedSubreddits[index].subreddit;
        if(!reportData.subreddits.includes(storedSubreddit)) {
          //the new report data does not include the stored subreddit, add it to removedsubreddits array
          removedSubreddits.push(index);
        }
      });

      //now test if there are any new subreddits
      for(let i = 0; i < reportData.subreddits.length; i++) {
        let newSubreddit = reportData.subreddits[i];
        //use the array we created to test the new subreddit data
        if(!storedSubredditsArray.includes(newSubreddit)) {
          //found a subreddit that wasn't previously stored, add it to newSubreddits array
          newSubreddits.push(newSubreddit);
        }
      }

      if(removedSubreddits.length > 0) {
        //now remove all subreddit relations in linking table
        await tools.asyncForEach(removedSubreddits, async (subredditID) => {
          let reportsSubredditsValues = [reportID, subredditID];
          await pg.query('DELETE FROM ReportsSubreddits WHERE ReportID = $1 AND SubredditID = $2', reportsSubredditsValues);
        });
      }

      if(newSubreddits.length > 0) {
        //now add all new subreddits to the linking table
        await tools.asyncForEach(newSubreddits, async (subreddit) => {
          //first see if the subreddit already exists in the sibreddits table
          let subredditValues = [subreddit.toLowerCase()];
          let subredditResult = await pg.query('SELECT SubredditID FROM Subreddits WHERE SubredditName = $1', subredditValues);

          if(subredditResult.rowCount > 0) {
            //if subreddit exists already, add it to the linking table
            let reportsSubredditValues = [reportID, subredditResult.rows[0].subredditid];
            await pg.query('INSERT INTO ReportsSubreddits (ReportdID, Subreddit) VALUES ($1, $2);', reportsSubredditValues);
          } else {
            //new subreddit, add it to subreddits table
            let subredditResult = await pg.query('INSERT INTO Subreddits (SubredditName) VALUES ($1) RETURNING SubredditID;', subredditValues);
            //now add it to the linking table
            let reportsSubredditValues = [reportID, subredditResult.rows[0].subredditid];
            await pg.query('INSERT INTO ReportsSubreddits (ReportID, SubredditID) VALUES ($1, $2);');
          }
        });
      }
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
