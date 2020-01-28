import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';

const Login = (props) => {
  let [handle, setHandle] = useState('');
  let [password, setPassword] = useState('');
  let [rememberMe, setRememberMe] = useState(false);
  let [showAlert, setShowAlert] = useState(false);
  let [showSpinner, setShowSpinner] = useState(false);

  //logs the user in
  const login = () => {
    setShowSpinner(true);
    let url = '/login?handle=' + handle + '&password=' + password + '&rememberMe=' + rememberMe;
    fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(response => response.json())
      .then((result) => {
        setShowSpinner(false);
        if(result.loggedIn) {
          props.setUserData(result.userData);
          props.setReportData(result.reportData);
          props.setUserLoggedIn(true);
        } else {
          setShowAlert(true);
        }
      })
  }

  const handleAlert = () => {
    if(showAlert) {
      return <Alert variant="danger" onClose={() => {setShowAlert(false)}} dismissible>Username/email or password didn't match</Alert>;
    }
  }

  const handleSpinner = () => {
    if(showSpinner) {
      return(
        <div style={{width: '100%', textAlign: 'center'}}>
          <Spinner animation="grow" />
        </div>
      );
    } else {
      return(
        <Button variant="dark" type="submit" className="form-action-button">
          Login
        </Button>
      );
    }
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
