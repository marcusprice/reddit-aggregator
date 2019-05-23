import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import ReportList from './ReportList';
import CreateReport from './CreateReport';
import ViewReport from './ViewReport';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: 'reports',
      reportIndex: 0
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
      let reports = this.props.reports.toArray();
      return <ViewReport
        reportIndex={this.state.reportIndex}
        report={reports[this.state.reportIndex]}
        changeView={this.changeView}
        userInfo={this.props.userData}
        updateReports={this.props.updateReports}
      />;
    }
  }

  changeView(view, reportIndex = null) {
    window.scrollTo(0,0);
    if(view === 'viewReport') {
      this.setState({show: view, reportIndex: reportIndex});
    } else {
      this.setState({show: view});
    }
  }

  render() {
    return(
      <div>
        <Navbar style={{display: 'flex', justifyContent: 'space-between'}} bg="dark" variant="dark">
          <Navbar.Brand style={{cursor: 'pointer'}} onClick={() => {this.changeView('reports')}}>Reddit Aggregator</Navbar.Brand>
          <DropdownButton variant="secondary" id="dropdown-basic-button" title="Menu" alignRight>
            <Dropdown.Item href="#/action-1">Reports</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Create Report</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Account Settings</Dropdown.Item>
          </DropdownButton>
        </Navbar>
        {this.handleView()}
      </div>
    );
  }
}

export default Dashboard;
