import React from 'react';
import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../css/report-form.css';
import { WithContext as ReactTags } from 'react-tag-input';

const KeyCodes = {
  comma: 188,
  enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

class EditReport extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      reportName: '',
      reportDescription: '',
      subreddits: [],
      suggestions: []
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleAddition = this.handleAddition.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
    this.editReport = this.editReport.bind(this);
  }

  handleClick(event) {
    event.preventDefault();
    this.props.changeView('reports');
  }

  handleChange(event) {
    if(event.target.id === 'reportName') this.setState({reportName: event.target.value});
    if(event.target.id === 'reportDescription') this.setState({reportDescription: event.target.value});
    if(event.target.id === 'notifications') this.setState({notifications: event.target.checked});
  }

  handleDelete(i) {
    const { subreddits } = this.state;
    this.setState({
     subreddits: subreddits.filter((subreddit, index) => index !== i),
    });
  }

  handleAddition(subreddit) {
      this.setState(state => ({ subreddits: [...state.subreddits, subreddit] }));
  }

  handleDrag(subreddit, currPos, newPos) {
      const subreddits = [...this.state.subreddits];
      const newSubreddits = subreddits.slice();

      newSubreddits.splice(currPos, 1);
      newSubreddits.splice(newPos, 0, subreddit);

      // re-render
      this.setState({ subreddits: newSubreddits });
  }

  componentDidMount() {
    let subreddits = this.props.report.subreddits.map(value => { return {id: value, text: value}});
    this.setState({
      reportName: this.props.report.name,
      reportDescription: this.props.report.description,
      subreddits: subreddits
    });
  }

  editReport(event) {
    event.preventDefault();

    let subreddits = this.state.subreddits.map(value => value.text);

    fetch('http://localhost:5000/editReport', {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'omit',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      referrer: 'no-referrer',
      body: JSON.stringify({
        userID: this.props.userInfo.userid,
        reportID: this.props.report.reportid,
        name: this.state.reportName,
        description: this.state.reportDescription,
        subreddits: subreddits,
        notifications: false
      })
    })
      .then(res => res.json())
      .then((response) => {
        if(response.reportEdited) {
          this.props.changeView('reports');
          this.props.updateReports(response.reportData)
        } else {
          //handle server error
        }
      });
  }

  render() {
    const { subreddits, suggestions } = this.state;
    return(
      <Container>
        <Jumbotron style={{backgroundColor: '#FFF', textAlign: 'center', padding: '92px 0px 92px 0px'}}>
          <h1 style={{fontWeight: '300'}}>Edit {this.props.report.name} Report</h1>
          <p className="lead">Use the form below to edit the report.</p>
          <Button onClick={this.handleClick} style={{marginRight: '1rem'}}>Back to Reports</Button>
        </Jumbotron>
        <Row>
          <Col>
            <Form className="editReportForm" onSubmit={this.editReport}>
              <Form.Group controlId="reportName">
                <Form.Label>Report Name</Form.Label>
                <Form.Control value={this.state.reportName} onChange={this.handleChange} required="required" type="text" placeholder="Enter a Report Name" />
              </Form.Group>

              <Form.Group controlId="reportDescription">
                <Form.Label>Report Description</Form.Label>
                <Form.Control value={this.state.reportDescription} onChange={this.handleChange} as="textarea" rows="3" placeholder="Enter Report Description (or none at all)" />
              </Form.Group>

              <Form.Group controlId="subreddits">
                <Form.Label>Subreddits</Form.Label>
                <ReactTags
                  classNames={{
                    tags: '',
                    tagInput: 'tagInputClass',
                    tagInputField: 'form-control',
                    selected: 'selectedClass',
                    tag: 'btn btn-secondary tag-button',
                    remove: 'tag-button-remove'
                  }}
                  allowDeleteFromEmptyInput={false}
                  tags={subreddits}
                  suggestions={suggestions}
                  handleDelete={this.handleDelete}
                  handleAddition={this.handleAddition}
                  handleDrag={this.handleDrag}
                  delimiters={delimiters}
                  placeholder={'Add a new subreddit'}
                  autofocus={false}
                />

              </Form.Group>

              <Button variant="dark" type="submit" block>
                Edit Report
              </Button>

            </Form>
          </ Col>
        </Row>
      </Container>
    );
  }
}

export default EditReport;
