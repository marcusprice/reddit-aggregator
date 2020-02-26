import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

const NavBar = (props) => {

  //logs the user out
  const logout = () => {
    const url = '/logout';
    fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(response => response.json())
      .then(result => {
        if(result.loggedOut) {  //user was logged out
          props.setUserData({});
          props.setReportData([]);
          props.setUserLoggedIn(false);
        }
      })
  }

  return(
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand onClick={() => { props.setView('report list') }} className="site-title">Reddit Aggregator</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
        </Nav>
        <Nav>
        <DropdownButton variant="secondary" id="dropdown-basic-button" title="Menu" alignRight>
          <Dropdown.Item onClick={() => { props.setView('report list') }}>Reports</Dropdown.Item>
          <Dropdown.Item onClick={() => { props.setView('create report') }}>Create Report</Dropdown.Item>
          <Dropdown.Item onClick={() => { props.setView('account settings') }}>Account Settings</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item onClick={() => {logout()}}>Logout</Dropdown.Item>
        </DropdownButton>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar;
