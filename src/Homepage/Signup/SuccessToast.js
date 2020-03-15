import React from "react";
import "../../App.css";
import "./Signup.css";
import Toast from "react-bootstrap/Toast";

class SuccessToast extends React.Component {
  constructor(props) {
    super();
    this.props = props;
  }

  render() {
    return (
      <Toast
        animation={true}
        show={this.props.show}
        onClose={this.props.handleToastClose}
      >
        <Toast.Header>Successfully signed up!</Toast.Header>
        <Toast.Body>You can now log in</Toast.Body>
      </Toast>
    );
  }
}

export default SuccessToast;
