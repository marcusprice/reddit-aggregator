import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import ReportList from './ReportList';

class Dashboard extends React.Component {
  render() {
    return(
      <div>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="#home">Reddit Aggregator</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="#home">Reports</Nav.Link>
            <Nav.Link href="#features">Account Settings</Nav.Link>
          </Nav>
        </Navbar>
        <Jumbotron style={{backgroundColor: '#FFF', textAlign: 'center', padding: '92px 0px 92px 0px'}}>
          <h1 style={{fontWeight: '300'}}>Reports</h1>
          <p className="lead">Welcome, {this.props.userData.firstname}! Below are your reports.</p>
          <Button style={{marginRight: '1rem'}}>Create New Report</Button>
          <Button style={{marginLeft: '1rem'}}variant="dark">Refresh Report Data</Button>
        </Jumbotron>
        <ReportList reportData={this.props.userData.reports} />
      </div>
    );
  }
}

export default Dashboard;
