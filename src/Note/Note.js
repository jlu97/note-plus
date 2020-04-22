import React from "react";
import "../App.css";
import "./Note.css";
import axios from "axios";
import AuthContext from "../AuthContext";
import {Link} from "react-router-dom";

class Note extends React.Component {
  static contextType = AuthContext;

  constructor(props) {
    super();
    this.props = props;
    this.state = {
      title: "",
      note_id: "",
      noteBody: [],
      showError: false,
      loading: true
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
        let noteAssets = [];
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
                note_id: noteId,
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
      })
      .catch(err => {
        this.setState({ showError: true });
      });
  }

  render() {
    if (this.state.showError){
      return <p>Please logout and try again.</p>
    }

    const noteBody = this.state.noteBody.map((page, index) => {
      return (
        <iframe
          key={index.toString()}
          title={this.state.title}
          className="note-iframe"
          src={"data:application/pdf;base64," + page}
          frameBorder="0"
          height="500"
        />
      );
    });
    return (
      <div>
        <h1>{this.state.title}</h1>
        {noteBody}
        <br></br>
        <p>Report this note if you think it is inappropriate</p>
        <Link to = {"/reporting/" + this.state.note_id}>
          <button class="report-button">Report</button>
        </Link>
      </div>
    );
  }
}

export default Note;
