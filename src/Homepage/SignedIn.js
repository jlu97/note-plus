import React from "react";
import "../App.css";
import { Link } from "react-router-dom";
import axios from "axios";
import AuthContext from "../AuthContext";
import Spinner from "react-bootstrap/Spinner";

class SignedIn extends React.Component {
  static contextType = AuthContext;

  constructor() {
    super();
    this.state = {
      loading: true,
      favCourses: [],
      showError: false
    };
  }

  componentDidMount() {
    // axios.get(url, config)
    axios
      .get(process.env.REACT_APP_ALL_COURSES_API, {
        headers: { Authorization: this.context.authToken }
      })
      .then(res => {
        this.setState({
          loading: false,
          favCourses: res.data,
          showError: false
        });
      })
      .catch(err => {
        this.setState({
          loading: false,
          showError: true
        });
      });
  }

  render() {
    const favCourses = this.state.favCourses.map(fav => (
      <li key={fav.course_id}>
        <Link to={"/course/" + fav.course_id}>{fav.course_name}</Link>
      </li>
    ));

    if (this.state.loading) {
      return (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      );
    } else if (this.state.showError) {
      return <p>Please logout and try again.</p>;
    } else {
      return (
        <div>
          <h3>Favorite Courses</h3>
          <ul>{favCourses}</ul>
        </div>
      );
    }
  }
}

export default SignedIn;
