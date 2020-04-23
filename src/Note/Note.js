import React from "react";
import "../App.css";
import "./Note.css";
import axios from "axios";
import AuthContext from "../AuthContext";
import { Link } from "react-router-dom";
import PDFNote from "./PDFNote";
import TextNote from "./TextNote";
import Button from "react-bootstrap/Button"

class Note extends React.Component {
  static contextType = AuthContext;

  constructor(props) {
    super();
    this.props = props;
    this.state = {
      title: "",
      noteBody: [],
      noteType: "",
      showError: false,
      loading: true,
      noteText: ""
    };
  }

  componentDidMount() {
    const noteId = this.props.match.params.noteId;
    axios
      .get(process.env.REACT_APP_NOTE_API + noteId, {
        headers: {
          Authorization: this.context.authToken
        }
      })
      .then(res => {
        this.setState({ noteType: res.data.note_type, noteText: res.data.text });
        let noteAssets = [];
        if (res.data.note_type !== "text") {
          for (const assetId of res.data.assets) {
            axios
              .get(process.env.REACT_APP_ASSET_API + assetId, {
                headers: { Authorization: this.context.authToken }
              })
              .then(assetRes => {
                noteAssets.push();
                this.setState({
                  showError: false,
                  loading: false,
                  noteBody: this.state.noteBody.concat(
                    assetRes.data.asset_b64data
                  ),
                  title: res.data.title
                });
              })
              .catch(error => {
                this.setState({ showError: true });
              });
          }
        }
      })
      .catch(err => {
        this.setState({ showError: true });
      });
  }

  render() {
    if (this.state.showError) {
      return <p>Please logout and try again.</p>;
    }

    let note;

    if (this.state.noteType === "text") {
      note = <TextNote title={this.state.title} noteText={this.state.noteText} />;
    } else if (this.state.noteType === "pdf") {
      note = (
        <PDFNote title={this.state.title} noteBody={this.state.noteBody} />
      );
    }
    return (
      <div>
        {note}
        <p className="text-danger">Report this note if you think it is inappropriate</p>
        <Link to={"/reporting/" + this.props.match.params.noteId}>
          <Button variant="danger">Report</Button>
        </Link>
      </div>
    );
  }
}

export default Note;
