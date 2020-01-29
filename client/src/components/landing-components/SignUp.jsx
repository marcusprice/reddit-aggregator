import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';

const SignUp = (props) => {
  //state variables
  let [username, setUserName] = useState('');                                                 //username state variable
  let [email, setEmail] = useState('');                                                       //email state variable
  let [password, setPassword] = useState('');                                                 //password state variable
  let [reTypedPassword, setReTypedPassword] = useState('');                                   //reTyped password state variable
  let [firstName, setFirstName] = useState('');                                               //first name state variable
  let [lastName, setLastName] = useState('');                                                 //last name state variable
  let [showAlert, setShowAlert] = useState(false);                                            //show alert state variable
  let [alertReason, setAlertReason] = useState('The passwords you entered didn\'t match');    //alert message  state variable
  let [showSpinner, setShowSpinner] = useState(false);                                        //spinner state variable

  //attempt signing up
  const signUp = () => {

    if(password === reTypedPassword) {  //if passwords match
      //start the spinner (prevents the user from double clicking AND shows that the the request is being processed (see handleSpinner))
      setShowSpinner(true);

      //compile user data into an object
      const userData = {
        username: username,
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName
      }

      fetch('/createUser', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(userData)
      })
        .then(response => response.json())
        .then((result) => {
          //the server has responded, show the sign up button again
          setShowSpinner(false);
          if(result.userCreated) {
            //set user data, report data (to empty array) and set logged in to true (all parent functions from App.js)
            props.setUserData(result.userData);
            props.setReportData([]);
            props.setUserLoggedIn(true);
          } else {  //there was a problem with the server, send the error
            setAlertReason(result.reason);
            setShowAlert(true);
          }
        })

    } else {  //passwords don't match, alert user
      setAlertReason('The passwords you entered didn\'t match');
      setShowAlert(true);
    }
  }

  //displays an alert to the user
  const handleAlert = () => {
    if(showAlert) {
      return <Alert onClose={() => {setShowAlert(false)}} dismissible>{alertReason}</Alert>;
    }
  }

  //shows a spinner when processing requests with the server
  const handleSpinner = () => {
    let output;
    if(showSpinner) { //processing server request
      output = (
        <div style={{width: '100%', textAlign: 'center'}}>
          <Spinner animation="grow" />
        </div>
      );
    } else {  //not processing a server request
      output = (
        <Button variant="dark" type="submit" className="form-action-button">
          Sign Up
        </Button>
      );
    }

    //return the result
    return output;
  }

  return(
    <div className="content-container">
      <Form onSubmit={(e) => {e.preventDefault(); signUp()}}>
        <h2>Sign Up</h2>
        {handleAlert()}
        <Form.Group controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" placeholder="Enter a Username" require="required" value={username} onChange={(e) => {setUserName(e.target.value)}} />
        </Form.Group>


        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Enter your email"  require="required" value={email} onChange={(e) => {setEmail(e.target.value)}} />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Enter a password"  require="required" value={password} onChange={(e) => {setPassword(e.target.value)}} />
        </Form.Group>

        <Form.Group controlId="formBasicPasswordRetyped">
          <Form.Label>Retype Password</Form.Label>
          <Form.Control type="password" placeholder="Retype that password"  require="required" value={reTypedPassword} onChange={(e) => {setReTypedPassword(e.target.value)}} />
        </Form.Group>

        <Form.Group controlId="formBasicFirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control type="text" placeholder="Enter your first name"  require="required" value={firstName} onChange={(e) => {setFirstName(e.target.value)}} />
        </Form.Group>

        <Form.Group controlId="formBasicLastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control type="text" placeholder="Enter your last name"  require="required" value={lastName} onChange={(e) => {setLastName(e.target.value)}} />
        </Form.Group>
        {handleSpinner()}
      </Form>
      <ul>
        <li onClick={() => {props.setView('login')}}>Back to Login</li>
      </ul>
    </div>
  );
}

export default SignUp;
