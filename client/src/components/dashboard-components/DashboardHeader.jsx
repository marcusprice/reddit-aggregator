import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';

const DashboardHeader = (props) => {
  let pageTitle, tagLine, buttonText;

  switch(props.view) {
    case 'report list':
      pageTitle = 'Reports';
      tagLine = `Welcome, ${props.firstName}. Below are your reports.`;
      buttonText = 'Create New Report';
      break;
    case 'account settings':
      pageTitle = 'Account Settings';
      tagLine = 'Edit your account settings below.';
      buttonText = 'Back to Reports';
      break;
    default:
      pageTitle = 'reports';
      tagLine = `Welcome, ${props.firstName}. Below are your reports.`;
      buttonText = 'Create New Report';
      break;
  }

  const handleClick= () => {
    if(props.view === 'account settings') {
      props.setView('report list');
    }
  }

  return(
    <Jumbotron fluid>
      <div className="dashboard-header">
        <h2>{ pageTitle }</h2>
        <h3 className="lead">{ tagLine }</h3>
        <Button onClick={() => { handleClick() }}variant="primary" type="submit">
          { buttonText }
        </Button>
      </div>
    </Jumbotron>
  );
}

export default DashboardHeader;
