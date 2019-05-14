import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

function App() {
  return (
    <div className="App">
      <Jumbotron>
        <h1 className="display-4">Reddit Aggregator</h1>
        <p className="lead">Personalized web app to collect the best daily Reddit submissions</p>
      </Jumbotron>

      <Container className="login-form">
        <Row
          className="align-middle"
        >
          <Col>
            <Form
              style={{
                width: '35%',
                margin: '0 auto'
              }}>
              <h3>Please Sign In</h3>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Username or Email</Form.Label>
                <Form.Control type="email" placeholder="Enter Username or Email" />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
              <Form.Group controlId="formBasicChecbox">
                <Form.Check type="checkbox" label="Remember Me" />
              </Form.Group>
              <Button variant="dark" type="submit" block>
                Login
              </Button>
            </Form>
          </ Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
