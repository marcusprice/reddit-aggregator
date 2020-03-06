import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import SubredditTags from './SubredditTags';
import Alert from 'react-bootstrap/Alert';

const EditReport = (props) => {
  let [reportName, setReportName] = useState(props.report.name);
  let [reportDescription, setReportDescsription] = useState(props.report.description);
  let [subreddits, setSubreddits] = useState([]);
  let [showAlert, setShowAlert] = useState(false);
  let [alertMessage, setAlertMessage] = useState('Report name and at least one subreddit is required');
  let [alertVariant, setAlertVariant] = useState(false);


  useEffect(() => {
    fetch('/getSubredditsByReport?reportID=' + props.report.reportid, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(response => response.json())
      .then((result) => {
        if(result.gotSubreddits) {
          setSubreddits(result.subreddits);
        }
      })
  }, [props.report.reportid]);

  const editReport = () => {
    if(reportName.length > 0 && subreddits.length > 0) {

      const reportData = {
        reportID: props.report.reportid,
        name: reportName,
        description: reportDescription,
        subreddits: subreddits,
        notifications: false
      };

      fetch('/editReport', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(reportData)
      })
        .then(response => response.json())
        .then(result => {
          props.setReportData(result.reportData);
          setAlertMessage('Report was succesfully edited');
          setAlertVariant('success');
          setShowAlert(true);
        })
    } else {
      setAlertMessage('Report name and at least one subreddit is required');
      setAlertVariant('danger');
      setShowAlert(true);
    }
  }

  const addSubreddit = (s) => {
    setSubreddits([...subreddits, s]);
  }

  const removeSubreddit = (i) => {
    const updatedSubreddits = subreddits.filter((item, index) => index !== i);
    setSubreddits(updatedSubreddits);
  }

  const handleAlert = () => {
    if(showAlert) {
      return <Alert variant={alertVariant} onClose={() => { setShowAlert(false) }} dismissible>{alertMessage}</Alert>
    }
  }

  return(
    <div className="content-container">
      <Form onSubmit={(e) => { e.preventDefault(); editReport(); }}>
        <h2>Edit Report</h2>
        { handleAlert() }
        <Form.Group controlId="formBasicFirstName">
          <Form.Label>Report Name</Form.Label>
          <Form.Control type="text" placeholder="Enter the name for the report" value={reportName} onChange={(e) => {setReportName(e.target.value)}}/>
        </Form.Group>

        <Form.Group controlId="formBasicLastName">
          <Form.Label>Report Description</Form.Label>
          <Form.Control as="textarea" rows="3" placeholder="Enter a description for the report" value={reportDescription} onChange={(e) => {setReportDescsription(e.target.value)}}/>
        </Form.Group>

        <SubredditTags subreddits={subreddits} addSubreddit={addSubreddit} removeSubreddit={removeSubreddit} />

        <Button variant="dark" type="submit" className="form-action-button">
          Edit Report
        </Button>
      </Form>
    </div>
  );

}

export default EditReport;
