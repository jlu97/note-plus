import React from "react";
import "../../App.css";
import "./Signup.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import SuccessToast from "./SuccessToast";
import axios from "axios";

class Signup extends React.Component {
  constructor() {
    super();
    this.state = {
      formDisabled: false,
      showError: false,
      success: false
    };
    this.formRef = React.createRef();

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleToastClose = this.handleToastClose.bind(this);
  }

  handleToastClose() {
    this.setState({ success: false });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({ formDisabled: true });
    const form = new FormData(event.target);
    const data = {
      username: form.get("username"),
      password: form.get("password"),
      first_name: form.get("first_name"),
      last_name: form.get("last_name"),
      email: form.get("email")
    };

    axios
      .post(
        process.env.REACT_APP_SIGNUP_API,
        data
      )
      .then(res => {
        this.formRef.current.reset();
        this.setState({ success: true });
        setTimeout(() => {
          this.setState({ success: false });
        }, 7000);
      })
      .catch(err => {
        this.setState({ showError: true });
        setTimeout(() => this.setState({showError: false}), 10000);
      })
      .then(() => {
        this.setState({ formDisabled: false });
      });
  }

  render() {
    return (
      <div className="login-container">
        <SuccessToast
          show={this.state.success}
          handleToastClose={this.handleToastClose}
        />
        <Form ref={this.formRef} onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              name="first_name"
              placeholder="First Name"
              disabled={this.state.formDisabled}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              name="last_name"
              placeholder="Last Name"
              disabled={this.state.formDisabled}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Email"
              disabled={this.state.formDisabled}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              placeholder="Username"
              disabled={this.state.formDisabled}
            />
            <Form.Text className={"text-danger "+ (this.state.showError ? '' : 'd-none')}>
              Username may already be taken.
            </Form.Text>
          </Form.Group>

          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
              disabled={this.state.formDisabled}
            />
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            disabled={this.state.formDisabled}
          >
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}

export default Signup;
