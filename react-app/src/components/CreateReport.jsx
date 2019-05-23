import React from 'react';
import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../css/new-report-form.css';
import { WithContext as ReactTags } from 'react-tag-input';

const KeyCodes = {
  comma: 188,
  enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

class CreateReport extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      reportName: '',
      reportDescription: '',
      subreddits: [],
      suggestions: [],
      notifications: false,
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleAddition = this.handleAddition.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
    this.createReport = this.createReport.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    fetch('http://localhost:5000/getSubreddits')
      .then(res => res.json())
      .then((result) => {
        let subreddits = [];
        result.forEach((value) => {
          subreddits.push({text: value.subredditname, id: value.subredditname});
        });
        this.setState({suggestions: subreddits});
      });
  }

  handleChange(event) {
    if(event.target.id === 'reportName') this.setState({reportName: event.target.value});
    if(event.target.id === 'reportDescription') this.setState({reportDescription: event.target.value});
    if(event.target.id === 'notifications') this.setState({notifications: event.target.checked});
  }

  createReport(event) {
    event.preventDefault();

    let subreddits = this.state.subreddits.map(value => value.text);

    fetch('http://localhost:5000/createReport', {
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
        userID: this.props.userID,
        name: this.state.reportName,
        description: this.state.reportDescription,
        subreddits: subreddits,
        notifications: this.state.notifications
      })
    })
      .then(res => res.json())
      .then((response) => {
        if(response.reportCreated) {
          this.props.changeView('reports');
          this.props.updateReports(response.reportData)
        } else {
          //handle server error
        }
      });
  }

  handleClick() {
    this.props.changeView('reports');
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

  render() {
    const { subreddits, suggestions } = this.state;
    return(
      <Container>
        <Jumbotron style={{backgroundColor: '#FFF', textAlign: 'center', padding: '92px 0px 92px 0px'}}>
          <h1 style={{fontWeight: '300'}}>Create Report</h1>
          <p className="lead">Use the form below to create a new report.</p>
          <Button onClick={this.handleClick} style={{marginRight: '1rem'}}>Back to Reports</Button>
        </Jumbotron>
        <Row>
          <Col>
            <Form className="createReportForm" onSubmit={this.createReport}>
              <Form.Group controlId="reportName">
                <Form.Label>Report Name</Form.Label>
                <Form.Control value={this.state.reportName} onChange={this.handleChange} required="required" type="text" placeholder="Enter a Report Name" />
              </Form.Group>

              <Form.Group controlId="reportDescription">
                <Form.Label>Report Description</Form.Label>
                <Form.Control value={this.state.reportDescription} onChange={this.handleChange} as="textarea" rows="3" placeholder="Enter Report Description" />
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
                />

              </Form.Group>

              <Form.Group controlId="notifications">
                <Form.Check  value={this.state.reportDescription} onChange={this.handleChange} type="checkbox" label="Email Notifications" />
              </Form.Group>

              <Button variant="dark" type="submit" block>
                Create Report
              </Button>

            </Form>
          </ Col>
        </Row>
      </Container>
    );
  }
}

export default CreateReport;
