import React from 'react';
import ReportCard from './ReportCard';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

class ReportList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showAlert: false
    };

    this.createReport = this.createReport.bind(this);
    this.updateReportData = this.updateReportData.bind(this);
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

  updateReportData(event) {
    event.preventDefault();
    fetch('http://localhost:5000/updateReportData?userID=' + this.props.userInfo.userid)
      .then(res => res.json())
      .then((reports) => {
        this.props.updateReports(reports);
        this.setState({showAlert: true});
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
          <Button onClick={this.createReport} style={{marginRight: '1rem'}}>Create New Report</Button>
          <Button onClick={this.updateReportData} style={{marginLeft: '1rem'}}variant="dark">Refresh Report Data</Button>
        </Jumbotron>

        <div style={{width: '80%', margin: '0 auto',}}>
          {this.handleAlert()}
          <div style={{display: 'flex', flexWrap:'wrap', width: '100%', margin: '0 auto', justifyContent: 'space-between'}} >
          {
            reports.map((report, index) => {
              return(<ReportCard changeView={this.props.changeView} report={report} reportIndex={index} key={report.reportid}/>)
            })
          }
          </div>
        </div>
      </div>
    );
  }
}

export default ReportList;
