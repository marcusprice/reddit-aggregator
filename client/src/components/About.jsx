import React from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import '../css/about.css';

class About extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(action) {
    if(action === 'loginForm') {
      this.props.handleToggle(action);
    } else {
      this.props.handleToggle(action);
    }
  }

  render() {
    return(
      <Container className="about">
        <h2>Who has time to be on Reddit all day?</h2>
        <p>
        Many Reddit posts get submitted throughout the day, and unless you can constantly check your reddit feed some content may be missed and buried by other submissions.</p>

        <p>
        Reddit Aggregator helps mitigate this problem by allowing you to create an account and submit a list of subreddits you enjoy. Reddit Aggregator will check the subreddits hourly and compile a list of entries throughout the day that match the subreddits you provide. These entries are bundled together into a nice readable format called a report. Users can have several reports for different purposes (each having their own set of subreddits).
        </p>

        <p className="lead">
        Sound cool? Go ahead and sign up, it just takes a minute.
        </p>
        <Container style={{textAlign: 'center'}} className="about-button-conatiner">
          <Button size="sm" variant="dark" className="about-button" onClick={() => {this.handleClick('signUpForm')}}>Sign Up</Button>
          <Button size="sm" variant="dark" className="about-button" onClick={() => {this.handleClick('loginForm')}}>Back to Sign In</Button>
        </Container>
      </Container>
    );
  }
}

export default About;
