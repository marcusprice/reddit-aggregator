import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

const ForgotPassword = (props) => {

  let [email, setEmail] = useState('');                 //email state variable
  let [showAlert, setShowAlert] = useState(false);      //alert state variable
  let [alertMessage, setAlertMessage] = useState('');   //alert message state variable
  let [alertVariant, setAlertVariant] = useState('');   //alert variant state variable

  //requests a temp password
  const requestNewPassword = () => {
    //set url query string
    const url = '/forgotPassword?email=' + email;
    fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(response => response.json())
      .then((result) => {
        if(result.tempPasswordSet) {  //the password has been reset
          //alert user that temp password has been set
          setAlertVariant('success');
          setAlertMessage('A temporary password has been sent to your email')
        } else {  //email wasn't found
          //alert the user
          setAlertVariant('danger');
          setAlertMessage('This email is not registered with Reddit Aggregator');
        }

        setShowAlert(true);
      })
  }

  //used when the user closes the alert notification
  const handleClose = () => {
    //set the show alert state to false
    setShowAlert(false);

    if(alertVariant === 'success') {  //temp password was set and sent to email
      //bring user to login screen
      props.setView('login');
    }
  }

  //shows alert
  const handleAlert = () => {
    if(showAlert) {
      return <Alert variant={ alertVariant } onClose={ handleClose } dismissible>{ alertMessage }</Alert>;
    }
  }

  return(
    <div className="content-container">
      <Form onSubmit={(e) => { e.preventDefault(); requestNewPassword() }}>
        <h2>Forgot Password</h2>
        { handleAlert() }
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Enter your email" value={email} onChange={(e) => { setEmail(e.target.value); }} />
        </Form.Group>

        <Button variant="dark" type="submit" className="form-action-button">
          Send Temporary Password
        </Button>

        <ul>
          <li onClick={() => {props.setView('login')}}>Back to Login</li>
        </ul>
      </Form>
    </div>
  );
}

export default ForgotPassword;
