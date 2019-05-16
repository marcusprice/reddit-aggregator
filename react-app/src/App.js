import React from 'react';
//import RedditAggregator from './components/RedditAggregator';
import LandingPage from './components/LandingPage';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: false,
      serverCheck: true,
      userData: null
    };

    this.handleDisplay = this.handleDisplay.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleDisplay() {
    if(!this.state.serverCheck) {
      fetch('/api/v1/checkLoginStatus')
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
        //return <RedditAggregator userData={this.state.userData} />;
      } else {
        return <LandingPage handleLogin={this.handleLogin} />;
      }
    }
  }

  handleLogin(userData) {
    this.setState({userData: userData, loggedIn: true});
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
