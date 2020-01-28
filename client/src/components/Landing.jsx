import React, { useState } from 'react';
import LandingHeader from './landing-components/LandingHeader';
import Login from './landing-components/Login';
import About from './landing-components/About';
import SignUp from './landing-components/SignUp';
import ForgotPassword from './landing-components/ForgotPassword';

const Landing = (props) => {
  let [view, setView] = useState('login');

  const handleView = () => {
    let output;
    switch(view) {
      case 'login':
        output = (
          <Login
            setUserLoggedIn={props.setUserLoggedIn}
            setUserData={props.setUserData}
            setReportData={props.setReportData}
            setView={setView}
          />
        );
        break;
      case 'about':
        output = (
          <About setView={setView} />
        );
        break;
      case 'sign up':
        output = (
          <SignUp
            setUserLoggedIn={props.setUserLoggedIn}
            setUserData={props.setUserData}
            setReportData={props.setReportData}
            setView={setView}
          />
        );
        break;
      case 'forgot password':
        output = <ForgotPassword setView={setView} />;
        break;
      default:
        output = (
          <Login
            setUserLoggedIn={props.setUserLoggedIn}
            setUserData={props.setUserData}
            setReportData={props.setReportData}
            setView={setView}
          />
        );
        break;
    }

    return output;
  }

  return(
    <div>
      <LandingHeader/>
      {handleView()}
    </div>
  )
}

export default Landing;
