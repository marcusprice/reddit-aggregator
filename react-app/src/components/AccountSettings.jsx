import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Jumbotron from 'react-bootstrap/Jumbotron';
import '../css/account-settings-form.css';

class AccountSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      passwordCheck: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleViewChange = this.handleViewChange.bind(this);
    this.updateUserInfo = this.updateUserInfo.bind(this);
  }

  componentDidMount() {
    this.setState({
      username: this.props.userInfo.username,
      email: this.props.userInfo.email,
      firstName: this.props.userInfo.firstname,
      lastName: this.props.userInfo.lastname
    });
  }

  handleChange(e) {
    if(e.target.id === 'username') this.setState({username: e.target.value});
    if(e.target.id === 'email') this.setState({email: e.target.value});
    if(e.target.id === 'firstName') this.setState({firstName: e.target.value});
    if(e.target.id === 'lastName') this.setState({lastName: e.target.value});
    if(e.target.id === 'password') this.setState({password: e.target.value});
    if(e.target.id === 'passwordCheck') this.setState({passwordCheck: e.target.value});
  }

  handleViewChange(e) {
    e.preventDefault();
    this.props.changeView('reports');
  }

  updateUserInfo(event) {
    event.preventDefault();

    fetch('http://localhost:5000/editUser', {
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
        userID: this.props.userInfo.userid,
        userData: {
          username: this.state.username,
          email: this.state.email,
          firstName: this.state.firstName,
          lastName: this.state.lastName
        }
      })
    })
      .then((res => res.json()))
      .then((response) => {
        console.log(response.userData);
        this.props.updateUserData(response.userData);
      });
  }

  render() {
    return(
      <div>
        <Jumbotron style={{backgroundColor: '#FFF', textAlign: 'center', padding: '92px 0px 92px 0px'}}>
          <h1 style={{fontWeight: '300'}}>Account Settings</h1>
          <p className="lead">Use the form below to edit your account settings.</p>
          <Button onClick={this.handleViewChange} style={{marginRight: '1rem'}}>Back to Reports</Button>
        </Jumbotron>
        <Row>
          <Col>
            <Form onSubmit={this.updateUserInfo} className="signup-form">
              <h2>User Info</h2>
              <Form.Group controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control value={this.state.username} id="username" onChange={this.handleChange} required="required" type="text" placeholder="Enter a Username" />
              </Form.Group>

              <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control value={this.state.email} id="email" onChange={this.handleChange} required="required" type="email" placeholder="Enter your Email" />
              </Form.Group>

              <Form.Group controlId="firstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control value={this.state.firstName} id="firstName" onChange={this.handleChange} required="required" type="text" placeholder="Enter Your First Name" />
              </Form.Group>

              <Form.Group controlId="lastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control value={this.state.lastName} id="lastName" onChange={this.handleChange} required="required" type="text" placeholder="Enter Your Last Name" />
              </Form.Group>

              <Button variant="dark" type="submit" block>
                Update User Info
              </Button>
            </Form>
            <Form className="signup-form">
              <h2>Change Password</h2>
              <Form.Group controlId="username">
                <Form.Label>New Password</Form.Label>
                <Form.Control value={this.state.password} id="password" onChange={this.handleChange} required="required" type="password" placeholder="Enter a Username" />
              </Form.Group>

              <Form.Group controlId="email">
                <Form.Label>Re-type Password</Form.Label>
                <Form.Control value={this.state.passwordCheck} id="passwordCheck" onChange={this.handleChange} required="required" type="password" placeholder="Enter your Email" />
              </Form.Group>

              <Button variant="dark" type="submit" block>
                Change Password
              </Button>
            </Form>
          </ Col>
        </Row>
      </div>
    );
  }
}

export default AccountSettings;
