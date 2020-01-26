# Reddit Aggregator Routes

These are the backend endpoints for the application.

## authRoutes.js

The auth routes manage the state for the users. This is where session variables are set which most of the other endpoints in the application rely on for validation. No session variables are set by direct user input.

### Check Login Status

This route is checked when the app is first opened. If the user is already logged in and has the rememberMe variable set to true it will grab all of the user & report data and pass it on to the client. If not it will return a false value for loggedIn which signal the client to display a login form.

### Login

Used to log the user in. The user will provide a handle (either username or email) and their password. If the user is validated the loggedIn session variable will be set to true and the userID session variable will be set to the ID returned by the model. If the rememberMe post variable is set to the string "true," the rememberMe session variable will be set to the boolean value true. Then it will then grab all of the user & report data and pass it on to the client.

If the user is not validated it returns the reason why, which is that either the username, email or password was entered incorrectly.

### Logout

This route will log the user out by setting the loggedIn, rememberMe session variables to false and the userID session variable to null. It returns a true loggedOut output which the client will use to display a login form.

## userRoutes.js

The user routes handle different tasks related to the user. Currently there is no way to delete a user.

### Create User

Creates a new user. Returns a true userCreated value to the client if successful. If there is a problem it returns a false userCreated value along with the reason why it wasn't successful.

### Edit User

Edits an existing user. Access to the controller is only possible if the user has a loggedIn session variable set to true along with the userID session variable set. The session variable for userID is what is sent to the controller & model to update the user's data. Returns a true userEdited value to the client if the edit was successful. If there is a problem it returns a false userEdited value along with the reason why it wasn't successful.

### Change Password

Edits the password for an existing user. Access to the controller is only possible if the user has a loggedIn session variable set to true along with the userID session variable set. The session variable for userID is what is sent to the controller & model to update the user's password. Returns a true passwordChanged value to the client if successful. If there is a problem it returns a false passwordChanged value along with the reason why it wasn't successful.

### Forgot Password

Used if the user forgets their password. User enters their email. The password is set to a random string which is emailed to them.

## reportRoutes.js

The report routes handle different tasks related to reports.

### Update Report Data

Grabs the most up-to-date report data and returns it to the client.

### Create Report

Creates a new report. Returns a true reportCreated value to the client if successful. If there is a problem it returns a false reportCreated value along with the reason why it wasn't successful.

### Edit Report

Edits an existing report. Access to the controller is only possible if the user has a loggedIn session variable set to true along with the userID session variable set. The session variable for userID is what is sent to the controller & model to update the user's report. Returns a true reportEdited value to the client if the edit was successful. If there is a problem it returns a false reportEdited value along with the reason why it wasn't successful.

### Delete Report

Deletes an existing report. Access to the controller is only possible if the user has a loggedIn session variable set to true along with the userID session variable set. The session variable for userID is what is sent to the controller & model to update the user's report. Returns a true reportDeleted value to the client if the edit was successfully deleted. If there is a problem it returns a false reportDeleted value along with the reason why it wasn't successful.

## subredditRoutes.js

### Get Subreddits

This route is for getting a collection of all the current subreddits currently saved in the database. Used for subreddit auto-suggestion when creating or editing a report.
