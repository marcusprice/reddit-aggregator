import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

const UpdatePassword = () => {
  let [newPassword, setNewPassword] = useState('');
  let [reTypedNewPassword, setReTypedNewPassword] = useState('');
  let [showAlert, setShowAlert] = useState(false);
  let [alertVariant, setAlertVariant] = useState('danger');
  let [alertMessage, setAlertMessage] = useState('');

  const updatePassword = () => {
    if(newPassword === reTypedNewPassword) {
      let passwordData = {
        newPassword: newPassword
      };

      fetch('/changePassword', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(passwordData)
      })
        .then(response => response.json())
        .then((result) => {
          if(result.passwordChanged) {
            setNewPassword('');
            setReTypedNewPassword('');
            setAlertMessage('Your password has been updated');
            setAlertVariant('success');
            setShowAlert(true);
          } else {
            setAlertMessage('There was a problem updating your password');
            setAlertVariant('danger');
            setShowAlert(true);
          }
        })

    } else {
      setAlertMessage('Your new passwords don\'t match');
      setAlertVariant('danger');
      setShowAlert(true);
    }
  }

  //displays an alert to the user
  const handleAlert = () => {
    if(showAlert) {
      return <Alert variant={ alertVariant } onClose={() => {setShowAlert(false)}} dismissible>{ alertMessage }</Alert>;
    }
  }

  return(
    <Form onSubmit={(e) => { e.preventDefault(); updatePassword() }} style={{marginTop: '64px'}}>
      <h2>Update Password</h2>
      { handleAlert() }
      <Form.Group controlId="formNewPassword">
        <Form.Label>New Password</Form.Label>
        <Form.Control type="password" placeholder="Enter a new password" value={newPassword} onChange={(e) => {setNewPassword(e.target.value)}}/>
      </Form.Group>

      <Form.Group controlId="formRetypedPassword">
        <Form.Label>Re-type New Password</Form.Label>
        <Form.Control type="password" placeholder="Re-type that new password" value={reTypedNewPassword} onChange={(e) => {setReTypedNewPassword(e.target.value)}}/>
      </Form.Group>

      <Button variant="dark" type="submit" className="form-action-button">
        Update Password
      </Button>
    </Form>
  );
}

export default UpdatePassword;
