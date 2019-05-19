import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

class ReportCard extends React.Component {
  render() {
    return(
      <Card style={{ width: '18rem', margin: '0 auto', marginBottom: '3rem'}}>
        <Card.Header variant="dark" as="h5"></Card.Header>
        <Card.Body>
          <Card.Title>{this.props.report.name}</Card.Title>
          <Card.Text>
            {this.props.report.description}
          </Card.Text>
          <ButtonGroup>
            <Button variant="secondary">View Report</Button>
            <Button variant="secondary">Edit Report</Button>
          </ButtonGroup>
        </Card.Body>
      </Card>
    );
  }
}

export default ReportCard;
