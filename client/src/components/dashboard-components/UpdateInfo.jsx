import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const UpdateInfo = (props) => {
  let [firstName, setFirstName] = useState(props.userData.firstname);
  let [lastName, setLastName] = useState(props.userData.lastname);
  let [email, setEmail] = useState(props.userData.email);
  let [handle, setHandle] = useState(props.userData.username);

  return(
    <Form onSubmit={(e) => { e.preventDefault(); }}>
      <h2>General Info</h2>
      <Form.Group controlId="formBasicFirstName">
        <Form.Label>First Name</Form.Label>
        <Form.Control type="text" placeholder="Enter your username or email" value={firstName} onChange={(e) => {setFirstName(e.target.value)}}/>
      </Form.Group>

      <Form.Group controlId="formBasicLastName">
        <Form.Label>Last Name</Form.Label>
        <Form.Control type="text" placeholder="Enter your username or email" value={lastName} onChange={(e) => {setLastName(e.target.value)}}/>
      </Form.Group>

      <Form.Group controlId="formBasicLastName">
        <Form.Label>Last Name</Form.Label>
        <Form.Control type="text" placeholder="Enter your username or email" value={email} onChange={(e) => {setEmail(e.target.value)}}/>
      </Form.Group>

      <Form.Group controlId="formBasicLastName">
        <Form.Label>Email</Form.Label>
        <Form.Control type="text" placeholder="Enter your username or email" value={handle} onChange={(e) => {setHandle(e.target.value)}}/>
      </Form.Group>

      <Button variant="dark" type="submit" className="form-action-button">
        Update Info
      </Button>
    </Form>
  );
}

export default UpdateInfo;
