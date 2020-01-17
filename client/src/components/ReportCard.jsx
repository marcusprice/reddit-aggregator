import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

class ReportCard extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleTitleClick = this.handleTitleClick.bind(this);
  }

  handleClick(event) {
    event.preventDefault();
    if(event.target.id === 'viewReport') this.props.changeView('viewReport', this.props.reportIndex);
    if(event.target.id === 'editReport') this.props.changeView('editReport', this.props.reportIndex);
    if(event.target.id === 'deleteReport') this.props.showDeleteReportWarning(this.props.reportIndex);
  }

  handleTitleClick() {
    this.props.changeView('viewReport', this.props.reportIndex)
  }

  render() {
    return(
      <Card style={{ width: '19rem', marginBottom: '3rem'}}>
        <Card.Header variant="dark">RA Report</Card.Header>
        <Card.Body>
          <Card.Title onClick={this.handleTitleClick} style={{cursor: 'pointer'}}>{this.props.report.name}</Card.Title>
          <Card.Text>
            {this.props.report.description}
          </Card.Text>
          <ButtonGroup>
            <Button id="viewReport" size="sm" variant="outline-secondary" onClick={this.handleClick}>View</Button>
            <Button id="editReport" size="sm" variant="outline-secondary" onClick={this.handleClick}>Edit</Button>
            <Button id="deleteReport" size="sm" variant="outline-secondary" onClick={this.handleClick}>Delete</Button>
          </ButtonGroup>
        </Card.Body>
      </Card>
    );
  }
}

export default ReportCard;
