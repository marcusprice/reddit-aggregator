import React from 'react';
import ReportCard from './ReportCard';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import '../css/report-list.css';

class ReportList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showAlert: false,
      showModal: false,
      deleteReportName: '',
      deleteReportID: 0
    };

    this.createReport = this.createReport.bind(this);
    this.showDeleteReportWarning = this.showDeleteReportWarning.bind(this);
    this.updateReportData = this.updateReportData.bind(this);
    this.deleteReport = this.deleteReport.bind(this);
    this.handleAlert = this.handleAlert.bind(this);
  }

  handleAlert() {
    if(this.state.showAlert) {
      return <Alert onClose={() => {this.setState({showAlert: false})}} dismissible variant="success">All Reports Updated</Alert>;
    }
  }

  createReport(event) {
    event.preventDefault();
    this.props.changeView('createReport');
  }

  showDeleteReportWarning(reportIndex) {
    let reports = this.props.reports.toArray();
    this.setState({
      showModal: true,
      deleteReportName: reports[reportIndex].name,
      deleteReportID: reports[reportIndex].reportid
    });
  }

  updateReportData(event) {
    event.preventDefault();
    fetch('http://localhost:5000/updateReportData?userID=' + this.props.userInfo.userid)
      .then(res => res.json())
      .then((reports) => {
        this.props.updateReports(reports);
        this.setState({showAlert: true});
      });
  }

  deleteReport(event) {
    event.preventDefault();
    fetch('http://localhost:5000/deleteReport?userID='+this.props.userInfo.userid+'&reportID='+this.state.deleteReportID)
      .then(res => res.json())
      .then((response) => {
        console.log(response);
        this.props.updateReports(response.reportData);
        this.setState({showModal: false});
      });
  }

  render() {
    let reports = this.props.reports.toArray();
    //convert the reports into an array of arrays (3 reports max each)

    return(
      <div>
        <Jumbotron style={{backgroundColor: '#FFF', textAlign: 'center', padding: '92px 0px 92px 0px'}}>
          <h1 style={{fontWeight: '300'}}>Reports</h1>
          <p className="lead">Welcome {this.props.userInfo.firstname}! Below are your reports.</p>
          <div className="button-container">
            <Button className="action-button" onClick={this.createReport}>Create New Report</Button>
            <Button className="action-button" onClick={this.updateReportData} variant="dark">Refresh Report Data</Button>
          </div>
        </Jumbotron>

        <Modal show={this.state.showModal} onHide={() => this.setState({showModal: false})}>
          <Modal.Header closeButton>
            <Modal.Title>Delete Report</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to delete your {this.state.deleteReportName} report?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => {this.setState({showModal: false})}}>
              Cancel
            </Button>
            <Button onClick={this.deleteReport} variant="danger">
              Delete
            </Button>
          </Modal.Footer>
        </Modal>

        <div style={{width: '80%', margin: '0 auto',}}>
          {this.handleAlert()}
          <div className="grid">
          {
            reports.map((report, index) => {
              return(<ReportCard
                showDeleteReportWarning={this.showDeleteReportWarning}
                changeView={this.props.changeView}
                report={report}
                reportIndex={index}
                key={report.reportid}/>
              )
            })
          }
          </div>
        </div>
      </div>
    );
  }
}

export default ReportList;
