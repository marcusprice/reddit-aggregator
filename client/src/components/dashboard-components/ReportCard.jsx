import React from 'react';
import Card from 'react-bootstrap/Card';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';

const ReportCard = (props) => {
  return(
    <Card bg="light" style={{ width: '18rem' }}>
      <Card.Header>RA Report</Card.Header>
      <Card.Body>
        <Card.Title>{props.name}</Card.Title>
        <Card.Text>
          {props.description}
        </Card.Text>
        <ToggleButtonGroup variant="outline-secondary" type="checkbox">
          <ToggleButton variant="outline-secondary" value={1}>View</ToggleButton>
          <ToggleButton variant="outline-secondary" value={2}>Edit</ToggleButton>
          <ToggleButton variant="outline-secondary" value={3}>Delete</ToggleButton>
        </ToggleButtonGroup>
      </Card.Body>
    </Card>
  )
}

export default ReportCard;
