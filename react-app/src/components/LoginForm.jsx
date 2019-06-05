import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import '../css/login-form.css';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      handle: '',
      password: '',
      rememberMe: 0,
      showAlert: false,
      alert: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAlert = this.handleAlert.bind(this);
  }

  handleChange(event) {
    if(event.target.id === 'handle') {this.setState({handle: event.target.value})}
    if(event.target.id === 'password') {this.setState({password: event.target.value})}
    if(event.target.id === 'rememberMe') {this.setState({rememberMe: event.target.checked})}
  }

  handleSubmit(event) {
    event.preventDefault();
    fetch('http://localhost:5000/login?handle=' +
    this.state.handle + '&password=' + this.state.password +
    '&rememberMe=' + this.state.rememberMe)
      .then((response) => {
        return response.json(response);
      })
      .then((response) => {
        if(response.loggedIn) {
          this.props.handleLogin(response);
        } else {
          let alert;
          if(response.reason === 'password didn\'t match') {
            alert = 'Incorrect Password';
          } else {
            alert = 'Incorrect Username or Email';
          }
          this.setState({
            showAlert: true,
            alert: alert
          });
        }
      });
  }

  handleClick(action) {
    this.props.handleToggle(action);
  }

  handleAlert() {
    if(this.state.showAlert) {
      return <Alert dismissible onClose={() => {this.setState({showAlert: false})}} variant="danger">{this.state.alert}</Alert>
    }
  }

  render() {
    return(
      <Container className="login-form">
        <Row>
          <Col>
            <Form onSubmit={this.handleSubmit}>
              {this.handleAlert()}
              <h3>Please Sign In</h3>
              <Form.Group controlId="handle">
                <Form.Label>Username or Email</Form.Label>
                <Form.Control value={this.state.handle} onChange={this.handleChange} type="text" placeholder="Enter Username or Email" />
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
