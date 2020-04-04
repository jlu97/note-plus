import React from "react";
import "./App.css";
import Homepage from "./Homepage/Homepage.js";
import Course from "./Course/Course.js";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link
} from "react-router-dom";
import UploadNote from "./Note/UploadNote";
import Note from "./Note/Note";
import Navbar from "react-bootstrap/navbar";
import AuthContext from "./AuthContext.js";

class App extends React.Component {
  constructor() {
    super();

    this.handleLogin = this.handleLogin.bind(this);
    this.logout = this.logout.bind(this);

    this.state = {
      isLoggedIn: localStorage.getItem("isLoggedIn") ? true : false,
      authToken: localStorage.getItem("authToken"),
      handleLogin: this.handleLogin
    };
  }

  handleLogin(loginStatus, token) {
    this.setState({ isLoggedIn: loginStatus, authToken: token });
    localStorage.setItem("isLoggedIn", loginStatus);
    localStorage.setItem("authToken", token);
  }

  logout() {
    this.setState({
      isLoggedIn: false,
      authToken: null
    });
    localStorage.removeItem("authToken");
    localStorage.removeItem("isLoggedIn");
  }

  render() {
    let logoutButton;
    if (this.state.isLoggedIn) {
      logoutButton = (
        <Navbar.Text className="ml-auto">
          <Link to="/" onClick={this.logout}>
            Logout
          </Link>
        </Navbar.Text>
      );
    }

    return (
      <AuthContext.Provider value={this.state}>
        <Router>
          <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="/">Note+</Navbar.Brand>
            {logoutButton}
          </Navbar>

          {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
          <Switch>
            <PrivateRoute
              path="/course/:courseId/upload"
              component={UploadNote}
            />
            <PrivateRoute path="/course/:courseId" component={Course} />
            <PrivateRoute path="/note/:noteId" component={Note} />

            <Route path="/">
              <Homepage />
            </Route>
          </Switch>
        </Router>
      </AuthContext.Provider>
    );
  }
}

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
// Source:
// https://reacttraining.com/react-router/web/example/auth-workflow
function PrivateRoute({ children, ...rest }) {
  const context = React.useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        context.isLoggedIn ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location }
            }}
          />
        )}
    />
  );
}

export default App;
