import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Jumbotron from 'react-bootstrap/Jumbotron';
import '../css/signup-form.css';

class AccountSettings extends React.Component {
  render() {
    return(
      <div>
        <Jumbotron style={{backgroundColor: '#FFF', textAlign: 'center', padding: '92px 0px 92px 0px'}}>
          <h1 style={{fontWeight: '300'}}>Account Settings</h1>
          <p className="lead">Use the form below to edit your account settings</p>
          <Button style={{marginRight: '1rem'}}>Back to Reports</Button>
        </Jumbotron>
        <Row>
          <Col>
            <Form className="signupForm">
              <Form.Group controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control required="required" type="text" placeholder="Enter a Username" />
              </Form.Group>

              <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control required="required" type="email" placeholder="Enter your Email" />
              </Form.Group>

              <Form.Group controlId="firstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control required="required" type="text" placeholder="Enter Your First Name" />
              </Form.Group>

              <Form.Group controlId="lastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control required="required" type="text" placeholder="Enter Your Last Name" />
              </Form.Group>

              <Button variant="dark" type="submit" block>
                Update Account
              </Button>

            </Form>
          </ Col>
        </Row>
      </div>
    );
  }
}

export default AccountSettings;
