import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import deleteIcon from '../../img/delete-icon.svg';


const SubredditTags = (props) => {

  let [suggestions, setSuggestions] = useState([]);
  let [matchedSuggestions, setMatchedSuggestions] = useState([]);
  let [subreddit, setSubreddit] = useState('');

  console.log(matchedSuggestions);

  //grabs a list of all subreddits in use for suggestions
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

  //submits a new subreddit to the report
  const handleKeyPressed = (e) => {
    //if user presses enter submit new subreddit & clear input
    if(e.key === 'Enter') {
      props.addSubreddit(subreddit);
      setSubreddit('');
    }
  }

  //when the user types (removes spaces)
  const handleChange = (e) => {
    let value = e.target.value;

    //if user presses space remove it
    value = value.replace(/\s/g, '');

    setMatchedSuggestions(detectSuggestion(value));
    setSubreddit(value);
  }

  //detects if user input matches any of the suggestions
  const detectSuggestion = (userInput) => {
    //output and matchDetected variables
    let output = [];
    let matchDetected = false;

    //only execute loops if user has entered more than one character
    if(userInput.length > 1) {
      //loop through each suggestion
      suggestions.forEach(suggestion => {
        //loop through each character in the suggestion
        for(let i = 0; i < suggestion.length - 1; i++) {
          if(matchDetected) { break; }
          //loop through each character in the user input
          for(let j = 0; j < userInput.length - 1; j++) {
            if(matchDetected) { break; }
            //make strings of current string index + 1
            let suggestionPlusNext = suggestion[i] + suggestion[i + 1];
            let userInputPlusNext = userInput[j] + userInput[j + 1];

            if(suggestionPlusNext.toLowerCase() === userInputPlusNext.toLowerCase()) {
              //there is a character match, set match detected var
              matchDetected = true;
            }
          }
        }

        if(matchDetected) {
          output.push(suggestion);
          matchDetected = false;
        }
      })
    }

    return output;
  }

  //creates an array of buttons showing the current subreddits in the report
  const showButtons = () => {
    let buttons = props.subreddits.map((value, key) => {
      return (
        <Button className="tag-button" key={key}>
          {value} <img onClick={() => { props.removeSubreddit(key) }} style={{width: "12px", height: "12px", marginLeft: "8px", marginBottom: "2px"}}src={deleteIcon} alt="delete icon" />
        </Button>
      );
    });

    return buttons;
  }

  return(
    <div className="subreddit-tag-container">
      <Form.Label>Report Subreddits</Form.Label>
      <div>
        { showButtons() }
      </div>
      <Form.Control className="tag-input" type="text" placeholder="Enter subreddits for your report here" value={subreddit} onChange={(e) => { handleChange(e) }} onKeyPress={handleKeyPressed} />
    </div>
  )
}

export default SubredditTags;
