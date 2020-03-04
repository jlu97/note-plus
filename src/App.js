import React from 'react';
import './App.css';
import Homepage from './Homepage/Homepage.js';
import Course from './Course/Course.js';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import UploadNote from './Note/UploadNote';
import Note from './Note/Note';
import Navbar from 'react-bootstrap/navbar';


function App() {
  return (
    <Router>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">Note+</Navbar.Brand>
      </Navbar>
      {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/course">
              <Course />
            </Route>

            <Route path="/upload">
              <UploadNote />
            </Route>

            <Route path="/note">
              <Note />
            </Route>

            <Route path="/">
              <Homepage />
            </Route>
          </Switch>
        </Router>
  );


}





export default App;
