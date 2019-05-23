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
    this.props.changeView('viewReport', this.props.report);
  }

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
            <Button size="sm" variant="outline-secondary" onClick={this.handleClick}>View Report</Button>
            <Button size="sm" variant="outline-secondary">Edit Report</Button>
          </ButtonGroup>
        </Card.Body>
      </Card>
    );
  }
}

export default ReportCard;
