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
      callback(validationError, null);
    } else {
      const reportSQL = 'INSERT INTO Reports ' +
      '(UserID, Name, Description, DateCreated, LastEdit, Notifications) ' +
      'VALUES ($1, $2, $3, now(), null, $4) RETURNING ReportID;';

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
          let reportID = result.rows[0].reportid;
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
              subredditResult = await pg.query('INSERT INTO Subreddits (Subreddit) VALUES ($1) RETURNING SubredditID;', subredditValues);
              subredditID = subredditResult.rows[0].subredditid;
            }

            //now insert into the ReportsSubreddits table
            let reportsSubredditsValues = [reportID, subredditID];
            await pg.query('INSERT INTO ReportsSubreddits (ReportID, SubredditID) VALUES ($1, $2)', reportsSubredditsValues);
          });

          //once the linking table has been updated return pass the reportID on to the next then block
          return reportID;
        })
        .then(async (reportID) => {
          //then enter filter data into filtered in table
          //this parameter is optional, test if there is data
          if(reportData.filteredIn.length > 0) {
            //there is filtered in data
            await tools.asyncForEach(reportData.filteredIn, async (filter) => {
              //first check if filter is already in filteredin table
              let filteredInValues = [filter.toLowerCase()];
              let filterResult = await pg.query('SELECT FilteredInID FROM FilteredIn WHERE FilteredIn = $1;', filteredInValues);

              let filterID;
              if(filterResult.rowCount > 0) {
                //filter already exists, get it's ID
                filterID = filterResult.rows[0].filteredinid;
              } else {
                //new subreddit, save it into the db
                filterResult = await pg.query('INSERT INTO FilteredIn (FilteredIn) VALUES ($1) RETURNING FilteredInID;', filteredInValues);
                filterID = filterResult.rows[0].filteredinid;
              }

              //now insert into the ReportsFilteredIn table
              let reportsFilteredInValues = [reportID, filterID];
              await pg.query('INSERT INTO ReportsFilteredIn (ReportID, FilteredInID) VALUES ($1, $2);', reportsFilteredInValues);
            });

            //once the linking table has been updated return pass the reportID on to the next then block
            return reportID;
          } else {
            return reportID;
          }
        })
        .then(async (reportID) => {
          //then enter filter data into filtered in table
          //this parameter is optional, test if there is data
          if(reportData.filteredOut.length > 0) {
            //there is filtered in data
            await tools.asyncForEach(reportData.filteredOut, async (filter) => {
              //first check if filter is already in filteredin table
              let filteredOutValues = [filter.toLowerCase()];
              let filterResult = await pg.query('SELECT FilteredOutID FROM FilteredOut WHERE FilteredOut = $1;', filteredOutValues);

              let filterID;
              if(filterResult.rowCount > 0) {
                //filter already exists, get it's ID
                filterID = filterResult.rows[0].filteredoutid;
              } else {
                //new subreddit, save it into the db
                filterResult = await pg.query('INSERT INTO FilteredOut (FilteredOut) VALUES ($1) RETURNING FilteredOutID;', filteredOutValues);
                filterID = filterResult.rows[0].filteredoutid;
              }

              //now insert into the ReportsFiltereedOut table
              let reportsFilteredOutValues = [reportID, filterID];
              await pg.query('INSERT INTO ReportsFilteredOut (ReportID, FilteredOutID) VALUES ($1, $2)', reportsFilteredOutValues);
            });

            callback(null, true);
          } else {
            callback(null, true);
          }
        })
        .catch((error) => {
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

      pg.query(sql, values, (err, result) => {
        if(err) {
          callback(err, null);
        } else {
          if(result.rows.length < 1) {
            const error = new Error('no results found');
            callback(error, null);
          } else {
            callback(null, result.rows[0]);
          }
        }
      });
    }
  },

  readAllReportsByUser: (userID, callback) => {
    if(typeof(userID) !== 'number') {
      const error = new Error('the input was not a number');
      callback(error, null);
    } else {
      const sql = 'SELECT * FROM Reports WHERE UserID = $1';
      const values = [userID];

      pg.query(sql, values, (err, result) => {
        if(err) {
          callback(err, null);
        } else {
          if(result.rows.length < 1) {
            const error = new Error('no results found');
            callback(error, null);
          } else {
            callback(null, result.rows);
          }
        }
      });
    }
  },

  updateReport: (reportID, reportData, callback) => {
    //validate input data
    const possibleKeys = [
      'name',
      'description',
      'notifications'
    ];
    const validationError = validation.validateInputData(reportData, possibleKeys);

    if(validationError) {
      callback(validationError, null);
    } else {
      const sql = 'UPDATE Reports ' +
      'SET Name = $1, Description = $2, Notifications = $3' +
      'WHERE ReportID = $4;';

      const values = [
        reportData.name,
        reportData.description,
        reportData.notifications,
        reportID
      ];

      pg.query(sql, values, (err, result) => {
        if(err) {
          callback(err, null);
        } else {
          callback(null, true);
        }
      });
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
