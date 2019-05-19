import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';

class LandingHeader extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.handleToggle('loginForm')
  }

  render() {
    return(
      <Jumbotron>
        <h1 style={{cursor: 'pointer'}}onClick={() => {this.handleClick()}} className="display-4">Reddit Aggregator</h1>
        <p className="lead">Personalized web app to collect the best daily Reddit submissions</p>
      </Jumbotron>

    );
  };
}

export default LandingHeader;
