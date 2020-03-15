import React from "react";
import "../App.css";
import SignedIn from "./SignedIn";
import NotSignedIn from "./NotSignedIn";

class Homepage extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: false
    };
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin() {
    this.setState({ isLoggedIn: true });
  }

  render() {
    if (this.state.isLoggedIn) {
      return <SignedIn />;
    }
    return <NotSignedIn handleLogin={this.handleLogin} />;
  }
}

export default Homepage;
