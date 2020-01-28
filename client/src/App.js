import React, {useState, useEffect} from 'react';
import Landing from './components/Landing';
import Spinner from 'react-bootstrap/Spinner';

const App = () => {

  let [serverChecked, setServerChecked] = useState(false);
  let [userLoggedIn, setUserLoggedIn] = useState(false);
  let [userData, setUserData] = useState({});
  let [reportData, setReportData] = useState([]);

  //first check the server to see if the user is logged in or not
  useEffect(() => {

    fetch('/checkLoginStatus', {
      headers : {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    })
      .then(response => response.json())
      .then(result => {
        if(result.loggedIn) {
          setUserData(result.userData);
          setReportData(result.reportData);
          setUserLoggedIn(true);
        }

        setServerChecked(true);
      })

  }, []);

  //to toggle the display between loading, loginscreen & dashboard
  const handleDisplay = () => {
    if(serverChecked) {
      if(userLoggedIn) {
        //show dashboard
        return(
          <div>
            This is a dashbaord
          </div>
        );
      } else {
        //show landing area
        return (
          <Landing
            setUserLoggedIn={setUserLoggedIn}
            setUserData={setUserData}
            setReportData={setReportData}
          />
        );
      }
    } else {
      //show loading icon
      return(
        <div style={{width: '100vw', height: '100vh', diplay: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <Spinner animation="grow" />
        </div>
      );
    }
  }

  return(
    handleDisplay()
  )
}

export default App;
