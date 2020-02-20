import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import deleteIcon from '../../img/delete-icon.svg';


const SubredditTags = (props) => {
  let [suggestions, setSuggestions] = useState([]);
  let [subreddit, setSubreddit] = useState('');

  useEffect(() => {

    fetch('/getSubreddits', {
      method: 'GET',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
      .then(response => response.json())
      .then((result) => {
        if(result.gotSubreddits) {
          setSuggestions(result.subreddits);
        }
      })

  }, []);

  const handleKeyPressed = (e) => {
    //if user presses enter submit new subreddit & clear input
    if(e.key === 'Enter') {
      props.addSubreddit(subreddit);
      setSubreddit('');
    }
  }

  const handleChange = (e) => {
    let value = e.target.value;

    //if user presses space remove it
    value = value.replace(/\s/g, '');

    setSubreddit(value);
  }

  const showButtons = () => {
    let buttons = props.subreddits.map((value, key) => {
      return <Button className="tag-button" key={key}>{value}<img onClick={() => { props.removeSubreddit(key) }} style={{width: "12px", height: "12px", marginLeft: "8px", marginBottom: "2px"}}src={deleteIcon} alt="delete icon" /></Button>
    });

    return buttons;
  }

  return(
    <div className="subreddit-tag-container">
      { showButtons() }
      <Form.Control className="tag-input" type="text" placeholder="Enter subreddits for your report here" value={subreddit} onChange={(e) => { handleChange(e) }} onKeyPress={handleKeyPressed} />
    </div>
  )
}

export default SubredditTags;
