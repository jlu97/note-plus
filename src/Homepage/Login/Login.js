import React from "react";
import "../../App.css";
import "./Login.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import AuthContext from "../../AuthContext"

class Login extends React.Component {
  static contextType = AuthContext;

  constructor(props) {
    super();
    this.props = props;
    this.state = {
      formDisabled: false,
      showError: false
    };

    this.formRef = React.createRef();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({ formDisabled: true });
    const form = new FormData(event.target);
    const data = {
      username: form.get("username"),
      password: form.get("password")
    };

    axios
      .post(process.env.REACT_APP_LOGIN_API, data)
      .then(res => {
        this.formRef.current.reset();
        this.setState({ formDisabled: false });
        // handleLogin(isLoggedIn, authToken)
        this.context.handleLogin(true, res.data.token);
      })
      .catch(err => {
        this.setState({ showError: true });
        setTimeout(() => this.setState({ showError: false }), 10000);

        this.setState({ formDisabled: false });
      });
  }

  render() {
    return (
      <div className="login-container">
        <Form ref={this.formRef} onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control
              name="username"
              type="text"
              placeholder="Username"
              disabled={this.state.formDisabled}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              name="password"
              type="password"
              placeholder="Password"
              disabled={this.state.formDisabled}
            />
          </Form.Group>

          <Form.Text
            className={"text-danger " + (this.state.showError ? "" : "d-none")}
          >
            Please try again.
          </Form.Text>

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

export default Login;
