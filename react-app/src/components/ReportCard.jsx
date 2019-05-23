import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

class ReportCard extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    event.preventDefault();
    this.props.changeView('viewReport', this.props.reportIndex);
  }

  render() {
    return(
      <Card style={{ width: '19rem', marginBottom: '3rem'}}>
        <Card.Header variant="dark">RA Report</Card.Header>
        <Card.Body>
          <Card.Title onClick={this.handleClick} style={{cursor: 'pointer'}}>{this.props.report.name}</Card.Title>
          <Card.Text>
            {this.props.report.description}
          </Card.Text>
          <ButtonGroup>
            <Button size="sm" variant="outline-secondary" onClick={this.handleClick}>View</Button>
            <Button size="sm" variant="outline-secondary">Edit</Button>
            <Button size="sm" variant="outline-secondary">Delete</Button>
          </ButtonGroup>
        </Card.Body>
      </Card>
    );
  }
}

export default ReportCard;
