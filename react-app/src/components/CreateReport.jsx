import React from 'react';
import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';

class CreateReport extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.changeView('reports');
  }

  render() {
    return(
      <Container>
        <Jumbotron style={{backgroundColor: '#FFF', textAlign: 'center', padding: '92px 0px 92px 0px'}}>
          <h1 style={{fontWeight: '300'}}>Create Report</h1>
          <p className="lead">Use the form below to create a new report.</p>
          <Button onClick={this.handleClick} style={{marginRight: '1rem'}}>Back to Reports</Button>
        </Jumbotron>
      </Container>
    );
  }
}

export default CreateReport;
