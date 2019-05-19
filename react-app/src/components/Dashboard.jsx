import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import ReportList from './ReportList';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
  }

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
        <ReportList userInfo={this.props.userData} reportData={this.props.userData.reports} />
      </div>
    );
  }
}

export default Dashboard;
