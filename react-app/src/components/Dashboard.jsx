import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';

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
        Welcome, {this.props.userData.firstname}!
      </div>
    );
  }
}

export default Dashboard;
