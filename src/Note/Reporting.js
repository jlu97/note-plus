import React from 'react';
import '../App.css';
import '../Homepage/Login/Login.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from "axios";

class Reporting extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
          uploadSuccess: false,
          showError: false,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        const noteId = this.props.match.params.noteId;
        event.preventDefault();
        event.persist();

        axios.post(process.env.REACT_APP_REPORT_API,
              {
                reporter: event.target.reporter.value,
                description: event.target.reason.value,
                note_id: noteId
                //status: "pending"
              }
              /*
              {
                headers: {
                  Authorization: this.context.authToken
                }
              }
              */
            )
            .then(state => {
                this.setState({
                  uploadSuccess: true,
                });
            })
            .catch(() => {
                this.setState({ showError: true, uploadSuccess: false });
            });
      }

    render() {
    let status;
    if (this.state.showError) {
      status = <p>Please log out and try again.</p>;
    } else if (this.state.uploadSuccess) {
      status = (
        <p>
          Report submitted!<br/>
        </p>
      )
    }

    return (
        <div className="reporting-container">
            <h2>Reporting</h2>
            <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="Name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" name="reporter" placeholder="Enter your username"/>
                </Form.Group>
                <Form.Group controlId="reason">
                    <Form.Label>Reason</Form.Label>
                    <Form.Control type="text" name="reason" placeholder="Reason for reporting"/>
                </Form.Group>
                <Button type="submit">Submit</Button>
            </Form>
            {status}
        </div>
    )
  }
}

export default Reporting;