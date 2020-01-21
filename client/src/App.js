import React, { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import { List } from 'immutable';
import Loader from 'react-loader-spinner'

const App = () => {
  let [userData, setUserData] = useState(null)
  let [loggedIn, setLoggedIn] = useState(false)
  let [serverChecked, setServerChecked] = useState(false)
  let [reports, setReports] = useState([])

  useEffect(() => {
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
        setLoggedIn(result.loggedIn);
        setUserData(result.userData);
        setServerChecked(true);
        setReports(reports);
      });
  }, []);

  const updateReports = (reportData) => {
    const reports = List(reportData);
    setReports(reports);
  }

  const updateUserData = (userData) => {
    setUserData(userData);
  }

  const handleDisplay = () => {
    if(serverChecked) {
      if(loggedIn) {
        return <Dashboard
          updateReports={updateReports}
          updateUserData={updateUserData}
          reports={reports}
          userData={userData}
          handleLogout={handleLogout}
        />;
      } else {
        return <LandingPage handleLogin={handleLogin} />;
      }
    } else {
      return (
        <div style={{width: '100%', display: 'flex', justifyContent: 'center', alignItems:'center', height: '100vh'}}>
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

  const handleLogin = (response) => {
    const reports = List(response.reportData);
    setUserData(response.userData);
    setLoggedIn(response.loggedIn);
    setReports(reports);
  }

  const handleLogout = () => {
    setUserData({});
    setLoggedIn(false);
    setReports([]);
  }


  return(
    <div className="app">
      {handleDisplay()}
    </div>
  );
}

export default App;
