import React from 'react';
import LandingHeader from './LandingHeader';
import LoginForm from './LoginForm';

class LandingPage extends React.Component {
  render() {
    return(
      <div>
        <LandingHeader />
        <LoginForm />
      </div>
    );
  }
}

export default LandingPage;
