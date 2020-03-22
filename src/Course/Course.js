import React from "react";
import "../App.css";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { Link } from "react-router-dom";
import axios from "axios";
import AuthContext from "../AuthContext";

class Course extends React.Component {
  static contextType = AuthContext;
  constructor(props) {
    super();
    this.props = props;
    this.state = {
      courseName: "",
      loading: true,
      showError: false
    };
  }

  componentDidMount() {
    const courseId = this.props.match.params.courseId;
    axios
      .get(process.env.REACT_APP_COURSE_API + courseId, {
        headers: { Authorization: this.context.authToken }
      })
      .then(res => {
        this.setState({
          courseName: res.data.course_name,
          loading: false,
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
          <h1>{this.state.courseName}</h1>
          <h2>Notes</h2>
          <br />
          <Link to="/upload">
            <Button>Upload Note</Button>
          </Link>
          <br />
          <br />

          <Table>
            <tr>
              <th>Title</th>
              <th>Date</th>
              <th>Author</th>
            </tr>
            <tr>
              <td>
                <Link to="/note">Lorem Ipsum</Link>
              </td>
              <td>01/01/20</td>
              <td>Jayson Isaac</td>
            </tr>
          </Table>
        </div>
      );
    }
  }
}

export default Course;
