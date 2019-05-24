import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import SubredditList from './SubredditList';
import Submissions from './Submissions';
import Spinner from 'react-bootstrap/Spinner';
import Modal from 'react-bootstrap/Modal';

class ViewReport extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      subredditIndex: 0,
      showSpinner: false,
      showModal: false
    }

    this.handleClick = this.handleClick.bind(this);
    this.showSubmissions = this.showSubmissions.bind(this);
    this.updateSubredditIndex = this.updateSubredditIndex.bind(this);
    this.updateReportData = this.updateReportData.bind(this);
    this.handleSpinner = this.handleSpinner.bind(this);
    this.showDeleteReportWarning = this.showDeleteReportWarning.bind(this);
    this.deleteReport = this.deleteReport.bind(this);
  }

  handleClick(event) {
    event.preventDefault();
    this.props.changeView('reports');
  }

  handleSpinner() {
    if(this.state.showSpinner) {
      return <Spinner size="sm" animation="grow" variant="light" />;
    } else {
      return 'Refresh Report Data';
    }
  }

  showDeleteReportWarning() {
    this.setState({
      showModal: true
    });
  }

  deleteReport(event) {
    event.preventDefault();
    fetch('http://localhost:5000/deleteReport?userID='+this.props.userInfo.userid+'&reportID='+this.props.report.reportid)
      .then(res => res.json())
      .then((response) => {
        this.props.updateReports(response.reportData);
        this.props.changeView('reports');
      });
  }

  updateReportData(event) {
    event.preventDefault();
    fetch('http://localhost:5000/updateReportData?userID=' + this.props.userInfo.userid)
      .then((res) => {
        this.setState({showSpinner: true});
        return res.json();
      })
      .then((reports) => {
        this.setState({showSpinner: false});
        this.props.updateReports(reports);
        this.props.changeView('viewReport', this.props.reportIndex);
      });
  }

  showSubmissions() {
    return <Submissions
      subredditName={this.props.report.subreddits[this.state.subredditIndex]}
      submissions={this.props.report.submissions[this.state.subredditIndex]}
    />;
  }

  updateSubredditIndex(index) {
    this.setState({subredditIndex: index});
  }

  render() {
    return(
      <div>
        <Modal show={this.state.showModal} onHide={() => this.setState({showModal: false})}>
          <Modal.Header closeButton>
            <Modal.Title>Delete Report</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to delete your {this.props.report.name} report?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => {this.setState({showModal: false})}}>
              Cancel
            </Button>
            <Button onClick={this.deleteReport} variant="danger">
              Delete
            </Button>
          </Modal.Footer>
        </Modal>

        <Jumbotron style={{backgroundColor: '#FFF', textAlign: 'center', padding: '92px 0px 92px 0px'}}>
          <h1 style={{fontWeight: '300'}}>{this.props.report.name}</h1>
          <p className="lead">{this.props.report.description}</p>
          <Button onClick={this.handleClick} style={{marginRight: '1rem'}}>Back to Reports</Button>
          <Button onClick={this.updateReportData} style={{marginLeft: '1rem'}} variant="dark">{this.handleSpinner()}</Button>
          <Button onClick={(event) => {event.preventDefault(); this.showDeleteReportWarning()}} style={{marginRight: '1rem'}}>Delete Report</Button>
        </Jumbotron>
        <SubredditList updateSubredditIndex={this.updateSubredditIndex} subreddits={this.props.report.subreddits}/>
        {this.showSubmissions()}
      </div>
    );
  }
}

export default ViewReport;
