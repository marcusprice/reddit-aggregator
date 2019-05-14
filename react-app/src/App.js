import React from 'react';
import LandingPage from './components/LandingPage';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: false
    };

    this.checkLoginStatus = this.checkLoginStatus.bind(this);
  }

  checkLoginStatus() {
    if(this.state.loggedIn) {
      //user is logged in, show the app

    } else {
      //check w/server to see if the user is logged in
      fetch('http://localhost:5000/api/v1/checkLoginStatus')
        .then((response) => {
          return response.json();
        })
        .then((response) => {
          if(response.loggedIn) {
            //user is logged in
          } else {
            //user is logged out, show landing page
            this.setState({loggedIn: false});
          }
        });
    }
    if(this.state.loggedIn) {

    } else {
      return <LandingPage />;
    }
  }

  render() {
    return(
      <div className="App">
        {this.checkLoginStatus()}
      </div>
    );
  }
}

export default App;
