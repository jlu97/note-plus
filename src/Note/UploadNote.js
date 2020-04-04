import React from "react";
import "../App.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import ProgressBar from "react-bootstrap/ProgressBar";
import AuthContext from "../AuthContext";

const toBase64 = file =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    // splt removes data:application/pdf;base64, from b64 string
    reader.onload = () => resolve(reader.result.split(",")[1]);
    reader.onerror = error => reject(error);
  });

class UploadNote extends React.Component {
  static contextType = AuthContext;
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      uploadSuccess: false,
      newNoteId: "",
      showError: false,
      progressBar: { total: 0, loaded: 0 }
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(event) {
    event.preventDefault();
    event.persist();
    // convert to b64
    toBase64(event.target.fileInput.files[0]).then(fileData => {
      // upload asset
      axios
        .post(
          process.env.REACT_APP_ASSET_API,
          {
            file_name: event.target.title.value + ".pdf",
            file_b64data: fileData
          },
          {
            headers: {
              Authorization: this.context.authToken
            },
            onUploadProgress: progress => {
              this.setState({
                progressBar: {
                  total: progress.total,
                  loaded: progress.loaded
                }
              });
            }
          }
        )
        .then(res => {
          // POST Note with asset id
          axios
            .post(
              process.env.REACT_APP_NOTE_API,
              {
                title: event.target.title.value,
                assets: [res.data.asset_id],
                course_id: this.props.match.params.courseId
              },
              { headers: { Authorization: this.context.authToken } }
            )
            .then(noteRes => {
              this.setState({
                uploadSuccess: true,
                newNoteId: noteRes.data.note_id
              });
            });
        })
        .catch(() => {
          this.setState({ showError: true, uploadSuccess: false });
        });
    });
  }

  render() {
    let status;
    if (this.state.showError) {
      status = <p>Please log out and try again.</p>;
    } else if (this.state.uploadSuccess) {
      status = (
        <p>
          Note uploaded!<br/>
          <a href={"/note/" + this.state.newNoteId}>Click here to view</a>
        </p>
      )
    } else if (this.state.progressBar.total > 0 && !this.uploadSuccess) {
      status = (
        <ProgressBar
          animated
          now={this.state.progressBar.loaded}
          max={this.state.progressBar.total}
        />
      );
    }

    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <h1>Upload Note</h1>
          <Form.Group>
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" name="title" placeholder="Title" />
          </Form.Group>

          <Form.Group>
            <Form.Control type="file" name="fileInput" required />
          </Form.Group>
          <Button type="submit">Submit</Button>
        </Form>
        {status}
      </div>
    );
  }
}

export default UploadNote;
