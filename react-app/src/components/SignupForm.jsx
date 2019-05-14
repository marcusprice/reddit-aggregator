import React from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import '../css/signup-form.css';

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(action) {
    if(action === 'loginForm') {
      this.props.handleToggle(action);
    } else {
      this.props.handleToggle(action);
    }
  }

  render() {
    return(
      <Container className="signup-form">
        <Row>
          <Col>
            <Form>
              <h3>Sign Up</h3>
              <Form.Group controlId="formBasicText">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="Enter a Username" />
              </Form.Group>

              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter your Email" />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>

              <Form.Group controlId="formBasicPassword2">
                <Form.Label>Retype Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>

              <Form.Group controlId="formBasicText">
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text" placeholder="Enter Your First Name" />
              </Form.Group>

              <Form.Group controlId="formBasicText">
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" placeholder="Enter Your Last Name" />
              </Form.Group>

              <Button variant="dark" type="submit" block>
                Create Account
              </Button>
            </Form>
          </ Col>
        </Row>
        <Container style={{textAlign: 'center', marginBottom: '2rem'}} className="singup-button-conatiner">
          <Button
            variant="dark"
            className="signup-button"
            onClick={() => {this.handleClick('loginForm')}}>
            Back to Sign In
          </Button>
          <Button
            variant="dark"
            className="signup-button" onClick={() => {this.handleClick('about')}}>Back to About</Button>
        </Container>
      </Container>
    );
  }
}

export default SignupForm;
