import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class ForgotPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: ''
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.requestNewPassword = this.requestNewPassword.bind(this);
  }

  handleClick(action) {
    this.props.handleToggle(action);
  }

  handleChange(e) {
    if(e.target.id === 'email') {this.setState({email: e.target.value})}
  }

  requestNewPassword() {

  }

  render() {
    return(
      <Container style={{width: '35%'}}className="forgot-password-form">
        <Row>
          <Col>
            <Form>
              <h3>Request A New Password</h3>
              <Form.Group controlId="email">
                <Form.Label>Enter Your Email</Form.Label>
                <Form.Control value={this.state.email} onChange={this.handleChange} type="email" placeholder="Enter Email" />
              </Form.Group>

              <Button className="forgot-password-button" variant="dark" type="submit" block>
                Send New Password
              </Button>
            </Form>
          </Col>
        </Row>
        <Container style={{textAlign: 'center'}} className="forgot-password-button-conatiner">
          <Button size="sm" variant="dark" className="about-button" onClick={() => {this.handleClick('loginForm')}}>Back to Sign In</Button>
        </Container>
      </Container>
    );
  }
};

export default ForgotPassword;
