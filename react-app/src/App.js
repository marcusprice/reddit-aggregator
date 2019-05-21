import React from 'react';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import { List } from 'immutable';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userData: null,
      loggedIn: false,
      serverChecked: false,
      initialLoad: true,
      reports: []
    };

    this.handleDisplay = this.handleDisplay.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  componentDidMount() {
    //run once to see if the user is logged in or not
    fetch('http://localhost:5000/checkLoginStatus')
      .then(res => res.json())
      .then((result) => {
        const reports = List(result.reportData);
        this.setState({
          loggedIn: result.loggedIn,
          userData: result.userData,
          serverChecked: true,
          initialLoad: false,
          reports: reports
        });
      });
  }

  handleDisplay() {
    if(!this.state.initialLoad) {
      if(this.state.loggedIn) {
        return <Dashboard reports={this.state.reports} userData={this.state.userData} />;
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
