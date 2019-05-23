import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import ReportList from './ReportList';
import CreateReport from './CreateReport';
import ViewReport from './ViewReport';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: 'reports',
      reportData: {}
    };

    this.handleView = this.handleView.bind(this);
    this.changeView = this.changeView.bind(this);
  }

  handleView() {
    if(this.state.show === 'reports') {
      return <ReportList
        updateReports={this.props.updateReports}
        changeView={this.changeView}
        userInfo={this.props.userData}
        reports={this.props.reports}
      />;
    } else if(this.state.show === 'createReport') {
      return <CreateReport
        updateReports={this.props.updateReports}
        userID={this.props.userData.userid}
        changeView={this.changeView}
      />;
    } else if(this.state.show === 'viewReport') {
      return <ViewReport
        report={this.state.reportData}
        changeView={this.changeView}
        userInfo={this.props.userData}
        updateReports={this.props.updateReports}        
      />;
    }
  }

  changeView(view, reportData = null) {
    window.scrollTo(0,0);
    if(view === 'viewReport') {
      this.setState({show: view, reportData: reportData});
    } else {
      this.setState({show: view});
    }
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
        {this.handleView()}
      </div>
    );
  }
}

export default Dashboard;
