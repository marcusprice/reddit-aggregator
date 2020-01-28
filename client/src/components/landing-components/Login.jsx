import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';

const Login = (props) => {

  let [handle, setHandle] = useState('');               //the user's handle
  let [password, setPassword] = useState('');           //the user's password
  let [rememberMe, setRememberMe] = useState(false);    //whether they want to be remembered or not
  let [showAlert, setShowAlert] = useState(false);      //alert state
  let [showSpinner, setShowSpinner] = useState(false);  //spinner state

  //logs the user in
  const login = () => {
    //start the spinner (prevents the user from double clicking AND shows that the the request is being processed (see handleSpinner))
    setShowSpinner(true);
    //set the url query string
    let url = '/login?handle=' + handle + '&password=' + password + '&rememberMe=' + rememberMe;
    fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(response => response.json())
      .then((result) => {
        //the server has responded, show the sign in button again
        setShowSpinner(false);
        if(result.loggedIn) { //the user was authenticated successfuly
          //set user data, report data and set logged in to true (all parent functions from App.js)
          props.setUserData(result.userData);
          props.setReportData(result.reportData);
          props.setUserLoggedIn(true);
        } else {  //the user wasn't authenticated
          //show the alert
          setShowAlert(true);
        }
      })
  }

  //displays an alert to the user
  const handleAlert = () => {
    if(showAlert) {
      return <Alert variant="danger" onClose={() => {setShowAlert(false)}} dismissible>Username/email or password didn't match</Alert>;
    }
  }

  //shows a spinner when processing requests with the server
  const handleSpinner = () => {
    let output;
    if(showSpinner) { //processing server request
      //show a spinner instead of a login in button
      output = (
        <div style={{width: '100%', textAlign: 'center'}}>
          <Spinner animation="grow" />
        </div>
      );
    } else {  //not processing a server request
      //show login button instead of spinner
      output = (
        <Button variant="dark" type="submit" className="form-action-button">
          Login
        </Button>
      );
    }

    //return result
    return output;
  }

  return(
    <div className="content-container">
      <Form onSubmit={(e) => { e.preventDefault(); login(); }}>
        <h2>Please Sign In</h2>
        { handleAlert() }
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Username or Email Address</Form.Label>
          <Form.Control type="text" placeholder="Enter your username or email" value={handle} onChange={(e) => {setHandle(e.target.value)}}/>
          <Form.Text className="text-muted">
            We'll never share your info with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Enter your password" value={password} onChange={(e) => {setPassword(e.target.value)}} />
        </Form.Group>
        <Form.Group controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Remember Me" value={rememberMe} onChange={(e) => {setRememberMe(e.target.checked)}} />
        </Form.Group>
        { handleSpinner() }
      </Form>
      <div>
        <ul>
          <li onClick={() => {props.setView('about')}}>New here? Learn More and Sign up!</li>
          <li onClick={() => {props.setView('forgot password')}}>Forgot Password</li>
        </ul>
      </div>
    </div>
  )
}

export default Login;
