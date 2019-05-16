import React from 'react';
import ForgotPasswordForm from './ForgotPasswordForm';
import NewPasswordSent from './NewPasswordSent';
import Spinner from 'react-bootstrap/Spinner';

class ForgotPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showForm: true,
      showSpinner: false
    };
    this.requestNewPassword = this.requestNewPassword.bind(this);
    this.handleDisplay = this.handleDisplay.bind(this);
    this.handleSpinner = this.handleSpinner.bind(this);
  }

  handleDisplay() {
    if(this.state.showForm) {
      return <ForgotPasswordForm handleToggle={this.props.handleToggle} requestNewPassword={this.requestNewPassword}/>;
    } else {
      //show message
      return <NewPasswordSent handleToggle={this.props.handleToggle}/>;
    }
  }

  handleSpinner() {
    if(this.state.showSpinner) {
      return <Spinner animation="border" variant="dark"/>;
    }
  }

  requestNewPassword(email) {
    this.setState({showSpinner: true});
    fetch('http://localhost:5000/api/v1/forgotPassword', {
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
        email: email
      })
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        if(response.result) {
          this.setState({showForm: false, showSpinner: false});
        }
      });
  }

  render() {
    return(
      <div>
        {this.handleDisplay()}
        {this.handleSpinner()}
      </div>
    );
  }
};

export default ForgotPassword;
