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

    this.state = {
      handle: '',
      password: '',
      rememberMe: 0
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    if(event.target.id === 'handle') {this.setState({handle: event.target.value})}
    if(event.target.id === 'password') {this.setState({password: event.target.value})}
    if(event.target.id === 'rememberMe') {this.setState({rememberMe: event.target.checked})}
  }

  handleSubmit(event) {
    event.preventDefault();
    fetch('http://localhost:5000/api/v1/login?handle=' +
    this.state.handle + '&password=' + this.state.password +
    '&rememberMe=' + this.state.rememberMe)
      .then((response) => {
        return response.json(response);
      })
      .then((response) => {
        if(response.loggedIn) {
          this.props.handleLogin(response);
        }
      });
  }

  handleClick(action) {
    this.props.handleToggle(action);
  }

  render() {
    return(
      <Container className="login-form">
        <Row>
          <Col>
            <Form onSubmit={this.handleSubmit}>
              <h3>Please Sign In</h3>
              <Form.Group controlId="handle">
                <Form.Label>Username or Email</Form.Label>
                <Form.Control value={this.state.handle} onChange={this.handleChange} type="email" placeholder="Enter Username or Email" />
              </Form.Group>

              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control value={this.state.password} onChange={this.handleChange} type="password" placeholder="Password" />
              </Form.Group>
              <Form.Group controlId="rememberMe">
                <Form.Check onChange={this.handleChange} type="checkbox" label="Remember Me" />
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
