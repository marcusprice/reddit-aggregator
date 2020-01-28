import React from 'react';
import Button from 'react-bootstrap/Button';

const About = (props) => {
  return(
    <div className="content-container">
      <h2>Who has time to be on Reddit all day?</h2>
      <p>
      Many Reddit posts get submitted throughout the day, and unless you can constantly check your reddit feed some content may be missed and buried by other submissions.<br /><br />

      Reddit Aggregator helps mitigate this problem by allowing you to create an account and submit a list of subreddits you enjoy. Reddit Aggregator will check the subreddits hourly and compile a list of entries throughout the day that match the subreddits you provide. These entries are bundled together into a nice readable format called a report. Users can have several reports for different purposes (each having their own set of subreddits).
      </p>
      <p className="lead">Sound cool? Go ahead and sign up, it just takes a minute.</p>
      <Button onClick={() => {props.setView('sign up')}} variant="dark" style={{display: 'block', margin: '0 auto', width: '100%'}}>
        Go to Sign Up Form
      </Button>
      <ul>
        <li onClick={() => {props.setView('login')}}>Back to Login</li>
      </ul>
    </div>
  )
}

export default About;
