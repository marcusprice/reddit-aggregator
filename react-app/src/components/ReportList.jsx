import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ReportCard from './ReportCard';
import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';

class ReportList extends React.Component {
  render() {
    //convert the reports into an array of arrays (3 reports max each)
    var reportGroupArray = [];
    while (this.props.reportData.length > 0) {
      reportGroupArray.push(this.props.reportData.splice(0, 3));
    }

    return(
      <div>
        <Jumbotron style={{backgroundColor: '#FFF', textAlign: 'center', padding: '92px 0px 92px 0px'}}>
          <h1 style={{fontWeight: '300'}}>Reports</h1>
          <p className="lead">Welcome, {this.props.userInfo.firstname}! Below are your reports.</p>
          <Button style={{marginRight: '1rem'}}>Create New Report</Button>
          <Button style={{marginLeft: '1rem'}}variant="dark">Refresh Report Data</Button>
        </Jumbotron>
        <Container style={{margin: '0 auto'}} >
          {
            reportGroupArray.map((reportGroup, groupIndex) => {
              return(
                <Row style={{margin: '0 auto', textAlign:'left'}} key={groupIndex}>
                  {
                    reportGroup.map((report, index) => {
                      return(
                        <Col key={index} style={{textAlign: 'left'}}>
                          <ReportCard report={report} key={index + 1}/>
                        </Col>
                      )
                    })
                  }
                </Row>
              )
            })
          }
        </Container>
      </div>
    );
  }
}

export default ReportList;
