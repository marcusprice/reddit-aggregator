import React from 'react';

const SuggestionBox = (props) => {
  const handleOutput = () => {
    let output = '';
    if(props.suggestions.length > 0) {

      const suggestions = props.suggestions.map((suggestion, index) => {
        return <li onClick={() => { props.addSubreddit(suggestion); props.clearInput(); }} className="suggestion-item" key={index}>{suggestion}</li>;
      });

      output = (
        <ul className="suggestion-box">
          { suggestions }
        </ul>
      );
    }

    return output;
  }

  return(handleOutput());
}

export default SuggestionBox;
