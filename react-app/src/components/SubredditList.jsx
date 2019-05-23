import React from 'react';
import Button from 'react-bootstrap/Button';
import '../css/subreddit-list.css';

class SubredditList extends React.Component {
  render() {
    return(
      <div className="subredditList">
        {
          this.props.subreddits.map((value, index) => {
            return (<Button onClick={(event) => {event.preventDefault(); this.props.updateSubredditIndex(index)}} className="subreddit-button" variant="secondary" key={index}>{value}</Button>)
          })
        }
      </div>
    );
  }
}

export default SubredditList;
