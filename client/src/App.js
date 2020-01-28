import React, {useState, useEffect} from 'react';
import Landing from './components/Landing';
import Spinner from 'react-bootstrap/Spinner';

const App = () => {

  let [serverChecked, setServerChecked] = useState(false);  //serverChecked state to manage initial server check
  let [userLoggedIn, setUserLoggedIn] = useState(false);    //loggedIn state to manage user's login state
  let [userData, setUserData] = useState({});               //userData stores the user's basic info
  let [reportData, setReportData] = useState([]);           //reportData stores the user's basic report info (without submission data)

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
    let output;
    if(serverChecked) { //server has responded
      if(userLoggedIn) {  //user is logged in
        //show dashboard
        output = (
          <div>
            This is a dashbaord
          </div>
        );
      } else {  //user is not logged in
        //show landing area
        output = (
          <Landing
            setUserLoggedIn={setUserLoggedIn}
            setUserData={setUserData}
            setReportData={setReportData}
          />
        );
      }
    } else {  //server has yet to respond
      //show loading icon
      output = (
        <div style={{width: '100vw', height: '100vh', diplay: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <Spinner animation="grow" />
        </div>
      );
    }

    //return result
    return output;
  }

  return(
    handleDisplay()
  )
}

export default App;
