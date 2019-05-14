import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';

class LandingHeader extends React.Component {
  render() {
    return(
      <Jumbotron>
        <h1 className="display-4">Reddit Aggregator</h1>
        <p className="lead">Personalized web app to collect the best daily Reddit submissions</p>
      </Jumbotron>

    );
  };
}

export default LandingHeader;
