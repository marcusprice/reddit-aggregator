import React from 'react';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userData: null,
      loggedIn: false,
      serverCheck: false,
    };

    this.handleDisplay = this.handleDisplay.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleDisplay() {
    if(!this.state.serverCheck) {
      fetch('http://localhost:5000/api/v1/checkLoginStatus')
        .then((response) => {
          return response.json();
        })
        .then((result) => {       
          if(result.loggedIn) {
            this.setState({loggedIn: true, serverCheck: true, userData: result.userData});
          } else {
            this.setState({loggedIn: false, serverCheck: true});
          }
        });
    } else {
      if(this.state.loggedIn) {
        return <Dashboard loggedIn={this.state.loggedIn} userData={this.state.userData} />;
      } else {
        return <LandingPage handleLogin={this.handleLogin} />;
      }
    }
  }

  handleLogin(user) {
    this.setState({userData: user.userData, loggedIn: user.loggedIn});
  }

  render() {
    return(
      <div className="app">
        {this.handleDisplay()}
      </div>
    );
  }
}

export default App;
