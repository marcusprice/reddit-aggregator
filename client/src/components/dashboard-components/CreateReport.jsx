import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import SubredditTags from './SubredditTags';

const CreateReport = () => {
  let [reportName, setReportName] = useState('');
  let [reportDescription, setReportDescsription] = useState('');
  let [subreddits, setSubreddits] = useState([]);
  
  const addSubreddit = (s) => {
    setSubreddits([...subreddits, s]);
  }

  const removeSubreddit = (i) => {
    const updatedSubreddits = subreddits.filter((item, index) => index !== i);
    setSubreddits(updatedSubreddits);
  }

  return(
    <div className="content-container">
      <Form onSubmit={(e) => { e.preventDefault(); }}>
        <h2>Create Report</h2>

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
          Update Info
        </Button>
      </Form>
    </div>
  )
}

export default CreateReport;
