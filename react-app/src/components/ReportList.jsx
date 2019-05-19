import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ReportCard from './ReportCard';
import Container from 'react-bootstrap/Container';

class ReportList extends React.Component {
  render() {
    //convert the reports into an array of arrays (3 reports max each)
    var reportGroupArray = [];
    while (this.props.reportData.length > 0) {
      reportGroupArray.push(this.props.reportData.splice(0, 3));
    }

    return(
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
    );
  }
}

export default ReportList;
