import React from 'react';
import ForgotPasswordForm from './ForgotPasswordForm';
import NewPasswordSent from './NewPasswordSent';

class ForgotPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showForm: true,
      showSpinner: false,
      showWarning: false
    };
    this.requestNewPassword = this.requestNewPassword.bind(this);
    this.handleDisplay = this.handleDisplay.bind(this);
    this.closeWarning = this.closeWarning.bind(this);
  }

  handleDisplay() {
    if(this.state.showForm) {
      return <ForgotPasswordForm
        handleToggle={this.props.handleToggle}
        requestNewPassword={this.requestNewPassword}
        spinner={this.state.showSpinner}
        showWarning={this.state.showWarning}
        closeWarning={this.closeWarning}
      />;
    } else {
      //show message
      return <NewPasswordSent handleToggle={this.props.handleToggle}/>;
    }
  }

  closeWarning() {
    this.setState({showWarning: false});
  }

  requestNewPassword(email) {
    this.setState({showSpinner: true});
    fetch('/forgotPassword', {
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
        } else {
          console.log(response);
          this.setState({showTrue: false, showSpinner: false, showWarning: true});
        }
      });
  }

  render() {
    return(
      <div>
        {this.handleDisplay()}
      </div>
    );
  }
};

export default ForgotPassword;
