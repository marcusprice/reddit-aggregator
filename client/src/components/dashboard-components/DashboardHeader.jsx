import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';

const DashboardHeader = (props) => {
  return(
    <Jumbotron fluid>
      <div className="dashboard-header">
        <h2>Reports</h2>
        <h3 className="lead">Welcome, {props.firstName}. Below are your reports.</h3>
        <Button variant="primary" type="submit">
          Create New Report
        </Button>
      </div>
    </Jumbotron>
  );
}

export default DashboardHeader;
