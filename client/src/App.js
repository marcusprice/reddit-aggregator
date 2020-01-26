import React, { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
<<<<<<< HEAD
import { List } from 'immutable';
=======
import { List } from 'immutable'; //reports array need to use immutable.js - see issue on github for more info
import Loader from 'react-loader-spinner'
>>>>>>> master

const App = () => {
  let [userData, setUserData] = useState(null)              //user data
  let [loggedIn, setLoggedIn] = useState(false)             //logged in status
  let [serverChecked, setServerChecked] = useState(false)   //if the server has been checked/had a response
  let [reports, setReports] = useState([])                  //the reports array

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
        if(result.loggedIn) { //the user is currently logged in
          //set the reports, logged in status and userdata state variables
          const reports = List(result.reportData);  //reports array need to use immutable.js - see issue on github for more info
          setReports(reports);
          setLoggedIn(result.loggedIn);
          setUserData(result.userData);
        }

        //set the serverChecked state variable
        setServerChecked(true);
      });
  }, []);




  //used to either display the login screen or dashboard
  const handleDisplay = () => {
    if(serverChecked) { //the server has been checked to see if the user is logged in or not
      if(loggedIn) {  //the user is logged in
        //show the dashboard
        return <Dashboard
          updateReports={updateReports}
          updateUserData={updateUserData}
          reports={reports}
          userData={userData}
          handleLogout={handleLogout}
        />;
      } else {  //user is not logged in
        //show the landing/login page
        return <LandingPage handleLogin={handleLogin} />;
      }
    } else {  //no response from the server yet, show the loader
        <div style={{width: '100%', display: 'flex', justifyContent: 'center', alignItems:'center', height: '100vh'}}>
          Ugh
        </div>
    )
    }
  }




  //log the user in
  const handleLogin = (response) => {
    const reports = List(response.reportData);
    setUserData(response.userData);
    setLoggedIn(response.loggedIn);
    setReports(reports);
  }

  //log the user out
  const handleLogout = () => {
    setUserData({});
    setLoggedIn(false);
    setReports([]);
  }

  //update the reports
  const updateReports = (reportData) => {
    const reports = List(reportData);
    setReports(reports);
  }

  //update the user data
  const updateUserData = (userData) => {
    setUserData(userData);
  }




  return(
    <div className="app">
      {handleDisplay()}
    </div>
  );
}

export default App;
