import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import '../css/login-form.css';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(action) {
    this.props.handleToggle(action);
  }

  render() {
    return(
      <Container className="login-form">
        <Row>
          <Col>
            <Form>
              <h3>Please Sign In</h3>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Username or Email</Form.Label>
                <Form.Control type="email" placeholder="Enter Username or Email" />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
              <Form.Group controlId="formBasicChecbox">
                <Form.Check type="checkbox" label="Remember Me" />
              </Form.Group>
              <Button variant="dark" type="submit" block>
                Login
              </Button>
            </Form>
            <p onClick={() => {this.handleClick('about')}}>New Here? Learn More &amp; Sign Up!</p>
            <p onClick={() => {this.handleClick('forgotPassword')}}>Forgot Password?</p>
          </ Col>
        </Row>
      </Container>
    );
  }
}

export default LoginForm;
