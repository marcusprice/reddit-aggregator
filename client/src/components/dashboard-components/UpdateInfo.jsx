import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

const UpdateInfo = (props) => {
  
  let [firstName, setFirstName] = useState(props.userData.firstname);
  let [lastName, setLastName] = useState(props.userData.lastname);
  let [email, setEmail] = useState(props.userData.email);
  let [handle, setHandle] = useState(props.userData.username);
  let [showAlert, setShowAlert] = useState(false);
  let [alertVariant, setAlertVariant] = useState('danger');
  let [alertMessage, setAlertMessage] = useState('');

  const updateInfo = () => {

    const userData = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      username: handle
    };

    fetch('/editUser', {
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
        if(result.userEdited) {
          props.setUserData(result.userData);
          setAlertVariant('success');
          setAlertMessage('Your account information has been updated')
          setShowAlert(true);
        } else {
          setAlertVariant('danger');
          setAlertMessage('There was a problem updating your account, please try again')
          setShowAlert(true);
        }
      })
  }

  const handleAlert = () => {
    if(showAlert) {
      return <Alert variant={alertVariant} onClose={() => { setShowAlert(false) }} dismissible>{ alertMessage }</Alert>
    }
  }

  return(
    <Form onSubmit={(e) => { e.preventDefault(); updateInfo(); }}>
      <h2>Update Info</h2>

      { handleAlert() }

      <Form.Group controlId="formBasicFirstName">
        <Form.Label>First Name</Form.Label>
        <Form.Control type="text" placeholder="Enter your first name" value={firstName} onChange={(e) => {setFirstName(e.target.value)}}/>
      </Form.Group>

      <Form.Group controlId="formBasicLastName">
        <Form.Label>Last Name</Form.Label>
        <Form.Control type="text" placeholder="Enter your last name" value={lastName} onChange={(e) => {setLastName(e.target.value)}}/>
      </Form.Group>

      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" placeholder="Enter your email" value={email} onChange={(e) => {setEmail(e.target.value)}}/>
      </Form.Group>

      <Form.Group controlId="formBasicUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" placeholder="Enter your username" value={handle} onChange={(e) => {setHandle(e.target.value)}}/>
      </Form.Group>

      <Button variant="dark" type="submit" className="form-action-button">
        Update Info
      </Button>
    </Form>
  );
}

export default UpdateInfo;
