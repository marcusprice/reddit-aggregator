import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';

const SignUp = (props) => {
  //state variables
  let [username, setUserName] = useState('');
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');
  let [reTypedPassword, setReTypedPassword] = useState('');
  let [firstName, setFirstName] = useState('');
  let [lastName, setLastName] = useState('');
  let [showAlert, setShowAlert] = useState(false);
  let [alertReason, setAlertReason] = useState('The passwords you entered didn\'t match');
  let [showSpinner, setShowSpinner] = useState(false);

  const signUp = () => {

    if(password === reTypedPassword) {  //if passwords match
      setShowSpinner(true);
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
        .then((response) => {
          return response.json();
        })
        .then((result) => {
          setShowSpinner(false);
          if(result.userCreated) {
            console.log(result);
            props.setReportData([]);
            props.setUserData(result.userData);
            props.setUserLoggedIn(true);
          } else {
            setAlertReason(result.reason);
            setShowAlert(true);
          }
        })

    } else {  //passwords don't match, alert user
      setAlertReason('The passwords you entered didn\'t match');
      setShowAlert(true);
    }
  }

  const handleAlert = () => {
    if(showAlert) {
      return <Alert onClose={() => {setShowAlert(false)}} dismissible>{alertReason}</Alert>;
    }
  }

  const handleSpinner = () => {
    if(showSpinner) {
      return (
        <div style={{width: '100%', textAlign: 'center'}}>
          <Spinner animation="grow" />
        </div>
      );
    } else {
      return (
        <Button variant="dark" type="submit" className="form-action-button">
          Sign Up
        </Button>
      );
    }
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
          <Form.Control type="email" placeholder="Enter a Username"  require="required" value={email} onChange={(e) => {setEmail(e.target.value)}} />
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
  )
}

export default SignUp;
