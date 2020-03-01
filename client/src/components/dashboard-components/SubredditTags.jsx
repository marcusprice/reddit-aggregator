import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import SuggestionBox from './SuggestionBox';
import deleteIcon from '../../img/delete-icon.svg';


const SubredditTags = (props) => {

  let [suggestions, setSuggestions] = useState([]);
  let [matchedSuggestions, setMatchedSuggestions] = useState([]);
  let [selectedSuggestion, setSelectedSuggestion] = useState(-1);
  let [subreddit, setSubreddit] = useState('');

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
      if(selectedSuggestion > -1) { //user is navigating through the suggestion list
        props.addSubreddit(matchedSuggestions[selectedSuggestion]);
      } else {  //user submits form form input
        props.addSubreddit(subreddit);
      }

      //clear the input
      clearInput();
      //prevent submit
      e.preventDefault();
    }
  }

  //when the user types (removes spaces)
  const handleChange = (e) => {
    let value = e.target.value;

    //if user presses space remove it
    value = value.replace(/\s/g, '');

    const detectedSuggestions = detectSuggestions(value);
    if(matchedSuggestions.length === 0) { setSelectedSuggestion(-1) } //if there are no matched suggestions set selectedSuggestion to -1
    setMatchedSuggestions(detectedSuggestions);
    setSubreddit(value);
  }

  //detects if user input matches any of the suggestions
  const detectSuggestions = (userInput) => {

    let output = [];
    let matchDetected = false;

    if(userInput.length > 1) { //only execute code if user entered more than one character

      //loop through each suggestion
      suggestions.forEach(suggestion => {

        //loop through each character in the user input
        for(let i = 0; i < userInput.length - 1; i++) {
          if(matchDetected) { break; }  //if a match is detected break out of the loop

          //create a string with the current character + 1
          let userInputPlusNext = userInput[i] + userInput[i + 1];

          if(suggestion.indexOf(userInputPlusNext) !== -1) {  //if the two characters are found in the suggestion
            matchDetected = true;
          }
        }

        if(matchDetected) {
          output.push(suggestion);
          matchDetected = false;
        }
      });
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

  //used to clear input & suggestions
  const clearInput = () => {
    setSubreddit('');
    setMatchedSuggestions([]);
    setSelectedSuggestion(-1);
  }

  //handles key up/key down for suggestion box navigation
  const handleKeyUpDown = (k) => {
    if(matchedSuggestions.length > 0) { //only execute code if there are suggstions
      if(k === 40) { //key was pressed down
        if(selectedSuggestion < matchedSuggestions.length - 1) {
          setSelectedSuggestion(selectedSuggestion += 1);
        }
      } else if(k === 38) { //key was pressed up
        if(selectedSuggestion > -1) {
          setSelectedSuggestion(selectedSuggestion -= 1);
        }
      }
    }
  }

  return(
    <div className="subreddit-tag-container">
      <Form.Label>Report Subreddits</Form.Label>

      <div>
        { showButtons() }
      </div>

      <Form.Control
        className="tag-input"
        type="text"
        placeholder="Enter subreddits for your report here"
        value={subreddit}
        onChange={(e) => { handleChange(e) }}
        onKeyPress={handleKeyPressed}
        onKeyDown={(e) => { handleKeyUpDown(e.keyCode); }}
      />

      <SuggestionBox
        suggestions={matchedSuggestions}
        selectedSuggestion={selectedSuggestion}
        addSubreddit={props.addSubreddit}
        clearInput={clearInput}
      />
    </div>
  )
}

export default SubredditTags;
