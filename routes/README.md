# Reddit Aggregator Routes

These are the endpoints for the application.

## Auth Routes

The auth routes manage the state for the users. This is where session variables are set which most of the other endpoints in the application rely on for validation. No session variables are set by direct user input.

### Check Login Status

This route is checked when the app is first opened. If the user is already logged in and has the rememberMe variable set to true it will grab all of the user & report data and pass it on to the client. If not it will return a false value for logged in which the client will use to display a login form.

### Login

Used to log the user in. The user will provide a handle (either username or email) and their password. If the user is validated by the controller the loggedIn session variable will be set to true and the userID session variable will be set to the ID returned by the model. If the rememberMe post variable is set to the string "true" the rememberMe session variable will be set to the boolean true. Then it will then grab all of the user & report data and pass it on to the client.

### Logout

This route will log the user out by setting the loggedIn variable to false, the userID variable to null and the rememberMe variable to false. It returns a loggedOut = true output which the client will use to display a login form.
