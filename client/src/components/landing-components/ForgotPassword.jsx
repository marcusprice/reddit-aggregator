import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

const ForgotPassword = (props) => {

  let [email, setEmail] = useState('');
  let [showAlert, setShowAlert] = useState(false);
  let [alertMessage, setAlertMessage] = useState('');
  let [alertVariant, setAlertVariant] = useState('');

  const requestNewPassword = () => {
    const url = '/forgotPassword?email=' + email;
    fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(response => response.json())
      .then((result) => {
        console.log(result);
        if(result.tempPasswordSet) {
          //alert user that temp password has been set
          setAlertVariant('success');
          setAlertMessage('A temporary password has been sent to your email')
        } else {
          //email wasn't found
          setAlertVariant('danger');
          setAlertMessage('This email is not registered with Reddit Aggregator');
        }

        setShowAlert(true);
      })
  }

  const handleAlert = () => {
    if(showAlert) {
      return <Alert variant={alertVariant} onClose={() => {setShowAlert(false); props.setView('login'); }} dismissible>{ alertMessage }</Alert>;
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
  )
}

export default ForgotPassword;
