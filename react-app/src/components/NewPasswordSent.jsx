import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import '../css/new-password-sent.css';

class NewPasswordSent extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.handleToggle('loginForm');
  }

  render() {
    return(
      <Container className="new-password-sent-container">
        <Row>
          <Col>
            <p className="lead">A temporary password has been sent to your email.</p>
            <Button onClick={this.handleClick} variant="dark">Return to Sign In</Button>
          </Col>
        </Row>
      </Container>

    );
  }
}

export default NewPasswordSent;
