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
import Reporting from './Note/Reporting';
import Editor from './Homepage/Editor/Editor.js';

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
  }

  render() {
    return (
      <AuthContext.Provider value={this.state}>
        <Router>
          <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="/">Note+</Navbar.Brand>
            <Navbar.Text className="ml-auto">
              <Link to="/" onClick={this.logout}>
                Logout
              </Link>
            </Navbar.Text>
          </Navbar>

          {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
          <Switch>
            <PrivateRoute path="/course/:courseId" component={Course}/>

            <PrivateRoute path="/upload">
              <UploadNote />
            </PrivateRoute>

            <PrivateRoute path="/note">
              <Note />
            </PrivateRoute>

            <PrivateRoute path="/reporting">
              <Reporting />
            </PrivateRoute>

            <PrivateRoute path="/editor">
              <Editor />
            </PrivateRoute>

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
