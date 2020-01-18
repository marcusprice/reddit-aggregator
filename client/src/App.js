import React from 'react';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import { List } from 'immutable';
import Loader from 'react-loader-spinner'

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
    this.handleLogout = this.handleLogout.bind(this);
    this.updateReports = this.updateReports.bind(this);
    this.updateUserData = this.updateUserData.bind(this);
  }

  componentDidMount() {
    //run once to see if the user is logged in or not
    fetch('/checkLoginStatus', {
      headers : {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    })
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

  updateReports(reportData) {
    const reports = List(reportData);
    this.setState({
      reports: reports
    });
  }

  updateUserData(userData) {
    this.setState({
      userData: userData
    });
  }

  handleDisplay() {
    if(!this.state.initialLoad) {
      if(this.state.loggedIn) {
        return <Dashboard
          updateReports={this.updateReports}
          updateUserData={this.updateUserData}
          reports={this.state.reports}
          userData={this.state.userData}
          handleLogout={this.handleLogout}
        />;
      } else {
        return <LandingPage handleLogin={this.handleLogin} />;
      }
    } else {
      return (<div style={{width: '100%', display: 'flex', justifyContent: 'center', alignItems:'center', height: '100vh'}}>
        <Loader
          type="BallTriangle"
          color="#343a40"
          height={100}
          width={100}
        />
      </div>
    )
    }
  }

  handleLogin(response) {
    const reports = List(response.reportData);
    this.setState({
      userData: response.userData,
      loggedIn: response.loggedIn,
      reports: reports
    });
  }

  handleLogout() {
    this.setState({
      userData: {},
      loggedIn: false,
      reports: []
    });
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
