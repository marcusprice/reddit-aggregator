import React from 'react';
import ReportCard from './ReportCard';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';

class ReportList extends React.Component {
  constructor(props) {
    super(props);
    this.createReport = this.createReport.bind(this);
    this.updateReportData = this.updateReportData.bind(this);
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

        <div style={{display: 'flex', flexWrap:'wrap', width: '80%', margin: '0 auto', justifyContent: 'space-between'}} >
        {
          reports.map((report, index) => {
            return(<ReportCard changeView={this.props.changeView} report={report} reportIndex={index} key={report.reportid}/>)
          })
        }
        </div>
      </div>
    );
  }
}

export default ReportList;
