import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const ReportCard = (props) => {
  let [show, setShow] = useState(false);
  let handleClose = () => setShow(false);
  let handleShow = () => setShow(true);

  const deleteReport = () => {
    fetch('/deleteReport?reportID=' + props.reportid, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(response => response.json())
      .then((result) => {
        if(result.reportDeleted) {
          props.setReportData(result.reportData);
        }
      })
  }

  const handleModal = () => {
    return (
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Report</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete your <b>{props.name}</b> report?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={() => {handleClose(); deleteReport(); }}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

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
          <ToggleButton variant="outline-secondary" value={3} onClick={handleShow}>Delete</ToggleButton>
        </ToggleButtonGroup>
      </Card.Body>
      {handleModal()}
    </Card>
  )
}

export default ReportCard;
