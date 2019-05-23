import React from 'react';
import '../css/submissions.css';

class Submissions extends React.Component {
  render() {
    return(
      <div className="submissions">
        <h2>{this.props.subredditName}</h2>
        {
          this.props.submissions.map((submission, index) => {
            return(
              <div key={submission.id} style={{padding: '3rem', marginBottom: '3rem', border: 'solid lightgray 2px', borderRadius: '5px'} }>
                <p className="lead">
                  <a style={{color: '#333'}} rel="noopener noreferrer" target="_blank" href={submission.url}>{submission.title}</a>
                </p>
                <p>Posted By: {submission.handlename}</p>
                <div style={{marginTop: '1.5rem', marginLeft: '3rem'}}>
                  <p className="lead">Top Comments</p>
                  {
                    submission.comments.map((comment, index) => {
                      return(
                        <p key={index}>{comment.handlename}: {comment.commenttext}</p>
                      )
                    })
                  }
                </div>
              </div>
            )
          })
        }
      </div>
    );
  }
}

export default Submissions;