import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import SubredditList from './SubredditList';
import Submissions from './Submissions';
import Spinner from 'react-bootstrap/Spinner';
import Modal from 'react-bootstrap/Modal';
import '../css/view-report.css';

class ViewReport extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      subredditIndex: 0,
      showSpinner: false,
      showModal: false,
      reportData: null
    }

    this.handleClick = this.handleClick.bind(this);
    this.updateSubredditIndex = this.updateSubredditIndex.bind(this);
    this.updateReportData = this.updateReportData.bind(this);
    this.handleSpinner = this.handleSpinner.bind(this);
    this.showDeleteReportWarning = this.showDeleteReportWarning.bind(this);
    this.deleteReport = this.deleteReport.bind(this);
    this.handleDislpay = this.handleDisplay(this);
  }

  //grab report data from the server
  componentDidMount() {
    fetch('/getReport?reportID=' + this.props.key, {
      headers : {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    })
      .then(response => response.json())
      .then((result) => {
        this.setState({reportData: result})
        console.log(result);
      })
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
    fetch('/deleteReport?userID='+this.props.userInfo.userid+'&reportID='+this.state.reportData.reportid)
      .then(res => res.json())
      .then((response) => {
        this.props.updateReports(response.reportData);
        this.props.changeView('reports');
      });
  }

  updateReportData(event) {
    event.preventDefault();
    fetch('/updateReportData?userID=' + this.props.userInfo.userid)
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

  updateSubredditIndex(index) {
    this.setState({subredditIndex: index});
  }

  handleDisplay() {
    if(this.state.reportData === null) {
      return(
        <div style={{width: '100%', display: 'flex', justifyContent: 'center', alignItems:'center', height: '100%'}}>
          Replace with loader
        </div>
      )
    } else {
      return(
        <div>
          <Modal show={this.state.showModal} onHide={() => this.setState({showModal: false})}>
            <Modal.Header closeButton>
              <Modal.Title>Delete Report</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to delete your {this.state.reportData.name} report?</Modal.Body>
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
            <h1 style={{fontWeight: '300'}}>{this.state.reportData.name}</h1>
            <p className="lead">{this.state.reportData.description}</p>
            <div className="button-container">
              <Button className="action-button" onClick={this.handleClick} >Back to Reports</Button>
              <Button className="action-button" onClick={this.updateReportData} variant="dark">{this.handleSpinner()}</Button>
              <Button className="action-button" onClick={(event) => {event.preventDefault(); this.showDeleteReportWarning()}}>Delete Report</Button>
            </div>
          </Jumbotron>
          <SubredditList updateSubredditIndex={this.updateSubredditIndex} subreddits={this.state.reportData.subreddits}/>
          <Submissions
            subredditName={this.state.reportData.subreddits[this.state.subredditIndex]}
            submissions={this.state.reportData.submissions[this.state.subredditIndex]}
          />
        </div>
      );
    }
  }

  render() {
    return(
      this.handleDislpay()
    )
  }
}

export default ViewReport;
