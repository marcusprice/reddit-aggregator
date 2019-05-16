import React from 'react';
import LandingHeader from './LandingHeader';
import LoginForm from './LoginForm';
import About from './About';
import SignupForm from './SignupForm';
import ForgotPassword from './ForgotPassword';

class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: 'loginForm'
    };

    this.handleDisplay = this.handleDisplay.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
  }

  handleToggle(action) {
    window.scrollTo(0, 0);
    if(action === 'loginForm') {
      this.setState({show: 'loginForm'});
    } else if(action === 'about') {
      this.setState({show: 'about'});
    } else if(action === 'signUpForm') {
      this.setState({show: 'signUpForm'});
    } else {
      this.setState({show: 'forgotPassword'});
    }
  }

  handleDisplay() {
    if(this.state.show === 'loginForm') {
      return <LoginForm handleToggle={this.handleToggle}/>;
    } else if(this.state.show === 'about') {
      return <About handleToggle={this.handleToggle}/>;
    } else if(this.state.show === 'signUpForm') {
      return <SignupForm handleToggle={this.handleToggle}/>;
    } else {
      return <ForgotPassword handleToggle={this.handleToggle}/>;
    }
  }

  render() {
    return(
      <div>
        <LandingHeader />
        {this.handleDisplay()}
      </div>
    );
  }
}

export default LandingPage;
