import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import SubredditList from './SubredditList';
import Submissions from './Submissions';
import Spinner from 'react-bootstrap/Spinner';

class ViewReport extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      subredditIndex: 0,
      showSpinner: false
    }

    this.handleClick = this.handleClick.bind(this);
    this.showSubmissions = this.showSubmissions.bind(this);
    this.updateSubredditIndex = this.updateSubredditIndex.bind(this);
    this.updateReportData = this.updateReportData.bind(this);
    this.handleSpinner = this.handleSpinner.bind(this);
  }

  handleClick(event) {
    event.preventDefault();
    this.props.changeView('reports');
  }

  handleSpinner() {
    if(this.state.showSpinner) {
      return <Spinner size="sm" animation="grow" variant="light" />;
    } else {
      return 'Refresh Report Data';
    }
  }

  updateReportData(event) {
    event.preventDefault();
    fetch('http://localhost:5000/updateReportData?userID=' + this.props.userInfo.userid)
      .then((res) => {
        this.setState({showSpinner: true});
        return res.json();
      })
      .then((reports) => {
        this.setState({showSpinner: false});        
        this.props.updateReports(reports);
        this.props.changeView('viewReport', this.props.reportIndex);
      });
  }

  showSubmissions() {
    return <Submissions
      subredditName={this.props.report.subreddits[this.state.subredditIndex]}
      submissions={this.props.report.submissions[this.state.subredditIndex]}
    />;
  }

  updateSubredditIndex(index) {
    this.setState({subredditIndex: index});
  }

  render() {
    return(
      <div>
        <Jumbotron style={{backgroundColor: '#FFF', textAlign: 'center', padding: '92px 0px 92px 0px'}}>
          <h1 style={{fontWeight: '300'}}>{this.props.report.name}</h1>
          <p className="lead">{this.props.report.description}</p>
          <Button onClick={this.handleClick} style={{marginRight: '1rem'}}>Back to Reports</Button>
          <Button onClick={this.updateReportData} style={{marginLeft: '1rem'}} variant="dark">{this.handleSpinner()}</Button>
        </Jumbotron>
        <SubredditList updateSubredditIndex={this.updateSubredditIndex} subreddits={this.props.report.subreddits}/>
        {this.showSubmissions()}
      </div>
    );
  }
}

export default ViewReport;
