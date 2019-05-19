import React from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import '../css/signup-form.css';

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.createNewUser = this.createNewUser.bind(this);
    this.handleAlert = this.handleAlert.bind(this);
    this.state = {
      username: '',
      email: '',
      password: '',
      passwordCheck: '',
      firstName: '',
      lastName: '',
      showWarning: false,
      warning: ''
    }
  }

  handleClick(action) {
    if(action === 'loginForm') {
      this.props.handleToggle(action);
    } else {
      this.props.handleToggle(action);
    }
  }

  handleChange(e) {
    if(e.target.id === 'username') {this.setState({username: e.target.value})}
    if(e.target.id === 'email') {this.setState({email: e.target.value})}
    if(e.target.id === 'password') {this.setState({password: e.target.value})}
    if(e.target.id === 'passwordCheck') {this.setState({passwordCheck: e.target.value})}
    if(e.target.id === 'firstName') {this.setState({firstName: e.target.value})}
    if(e.target.id === 'lastName') {this.setState({lastName: e.target.value})}
  }

  handleAlert() {
    if(this.state.showWarning) {
      window.scrollTo(0, 0);
      return <Alert
        onClose={() => {this.setState({showWarning: false, alertShown: false})}}
        dismissible
        variant="danger">
          {this.state.warning}
      </Alert>;
    }
  }

  createNewUser(event) {
    event.preventDefault();
    if(this.state.password === this.state.passwordCheck) {
      //create new user
      fetch('http://localhost:5000/api/v1/createUser', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'omit',
        headers: {
          'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrer: 'no-referrer',
        body: JSON.stringify({
          username: this.state.username,
          email: this.state.email,
          password: this.state.password,
          firstName: this.state.firstName,
          lastName: this.state.lastName
        })
      })
        .then((response) => {
          return response.json();
        })
        .then((response) => {
          if(response.userCreated) {

          } else {
            //show warning
            if(response.reason === 'Error: username or email already exists') {
              this.setState({showWarning: true, warning: 'Username and/or Email Already In Use'});
            }
          }
        });
    } else {
      //send warning
      this.setState({showWarning: true, warning: 'Passwords Do Not Match'});
    }
  }

  render() {
    return(
      <Container className="signup-form">
        {this.handleAlert()}
        <Row>
          <Col>
            <Form className="signupForm" onSubmit={this.createNewUser}>

              <h3>Sign Up</h3>
              <Form.Group controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control value={this.state.username} onChange={this.handleChange} required="required" type="text" placeholder="Enter a Username" />
              </Form.Group>

              <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control value={this.state.email} onChange={this.handleChange} required="required" type="email" placeholder="Enter your Email" />
              </Form.Group>

              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control value={this.state.password} onChange={this.handleChange} required="required" type="password" placeholder="Password" />
              </Form.Group>

              <Form.Group controlId="passwordCheck">
                <Form.Label>Retype Password</Form.Label>
                <Form.Control value={this.state.passwordCheck} onChange={this.handleChange} required="required" type="password" placeholder="Password" />
              </Form.Group>

              <Form.Group controlId="firstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control value={this.state.firstName} onChange={this.handleChange} required="required" type="text" placeholder="Enter Your First Name" />
              </Form.Group>

              <Form.Group controlId="lastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control  value={this.state.lastName} onChange={this.handleChange} required="required" type="text" placeholder="Enter Your Last Name" />
              </Form.Group>

              <Button variant="dark" type="submit" block>
                Create Account
              </Button>

            </Form>
          </ Col>
        </Row>

        <Container style={{textAlign: 'center', marginBottom: '2rem'}} className="singup-button-conatiner">
          <Button
            size="sm"
            variant="dark"
            className="signup-button"
            onClick={() => {this.handleClick('loginForm')}}>
            Back to Sign In
          </Button>

          <Button
            size="sm"
            variant="dark"
            className="signup-button" onClick={() => {this.handleClick('about')}}>Back to About</Button>
        </Container>

      </Container>
    );
  }
}

export default SignupForm;
