import React from "react";
import "../App.css";
import Login from "./Login/Login.js";
import Signup from "./Signup/Signup.js";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function NotSignedIn() {
  return (
    <div>
      <Row>
        <Col>
          <h1>Log In</h1>
          <Login  />
        </Col>
        <Col>
          <h1>Sign Up</h1>
          <Signup />
        </Col>
      </Row>
    </div>
  );
}

export default NotSignedIn;
