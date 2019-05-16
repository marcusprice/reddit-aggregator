import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../css/forgot-password-form.css';

class ForgotPasswordForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: ''
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleButtonText = this.handleButtonText.bind(this);
    this.warning = this.warning.bind(this);
  }

  handleClick(action) {
    this.props.handleToggle(action);
  }

  handleButtonText() {
    if(!this.props.spinner) {
      return 'Send Temporary Password';
    } else {
      return <Spinner size="sm" animation="grow" variant="light" />
    }
  }

  warning() {
    if(this.props.showWarning) {
      return <Alert
      onClose={() => {this.props.closeWarning()}}
      dismissible
      variant="danger">
      That Email Is Not Registered
      </Alert>
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.requestNewPassword(this.state.email);
  }

  handleChange(e) {
    if(e.target.id === 'email') {this.setState({email: e.target.value})}
  }

  render() {
    return(
      <Container className="forgot-password-form">
        <Row>
          <Col>
            <Form onSubmit={this.handleSubmit}>
              {this.warning()}
              <h3>Forgot Password</h3>
              <Form.Group controlId="email">
                <Form.Label>Enter Your Email</Form.Label>
                <Form.Control value={this.state.email} onChange={this.handleChange} type="email" placeholder="Enter Email" />
              </Form.Group>

              <Button className="forgot-password-button" variant="dark" type="submit" block>
                {this.handleButtonText()}
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
}

export default ForgotPasswordForm;
