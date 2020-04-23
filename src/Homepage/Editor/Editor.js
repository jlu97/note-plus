import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import "../../App.css";
import "./Editor.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import katex from "katex";
import "katex/dist/katex.min.css";
import AuthContext from "../../AuthContext";

window.katex = katex;

class Editor extends React.Component {
  static contextType = AuthContext;
  constructor(props) {
    super(props);
    this.state = {
      uploadSuccess: false,
      newNoteId: "",
      showError: false
    };
    this.quillRef = null;
    this.reactQuillRef = null;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.attachQuillRefs = this.attachQuillRefs.bind(this);
  }

  componentDidMount() {
    this.attachQuillRefs();
  }

  componentDidUpdate() {
    this.attachQuillRefs();
  }

  attachQuillRefs() {
    if (typeof this.reactQuillRef.getEditor !== "function") return;
    if (this.quillRef != null) return;
    const quillRef = this.reactQuillRef.getEditor();
    if (quillRef != null) this.quillRef = quillRef;
  }

  handleSubmit(event) {
    event.preventDefault();
    event.persist();
    console.log(this.quillRef.getContents());
    axios
      .post(
        process.env.REACT_APP_NOTE_API,
        {
          title: event.target.title.value,
          course_id: this.props.match.params.courseId,
          note_type: "text",
          text: JSON.stringify(this.quillRef.getContents())
        },
        { headers: { Authorization: this.context.authToken } }
      )
      .then(noteRes => {
        this.setState({
          uploadSuccess: true,
          newNoteId: noteRes.data.note_id
        });
      })
      .catch(() => {
        this.setState({ showError: true, uploadSuccess: false });
      });
  }

  modules = {
    toolbar: [
      [{ font: [] }],
      [{ header: [1, 2, 3, 4, 5, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ color: [] }, { background: [] }],
      [
        { align: [] },
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" }
      ],
      ["code-block"],
      ["link", "image", "formula"],
      ["clean"]
    ],
    formula: true
  };

  formats = [
    "font",
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "color",
    "background",
    "align",
    "list",
    "bullet",
    "indent",
    "code-block",
    "link",
    "image",
    "formula"
  ];

  /*= (content, delta, source, editor) => {
    var deltaObj = editor.getContents();
    console.log(deltaObj); // delta object
		//console.log(editor.getHTML()); // rich text
		//console.log(editor.getText()); // plain text
		//console.log(editor.getLength()); // number of characters
	}
  */

  render() {
    let status;
    if (this.state.showError) {
      status = <p>Please log out and try again.</p>;
    } else if (this.state.uploadSuccess) {
      status = (
        <p>
          Note uploaded!<br />
          <a href={"/note/" + this.state.newNoteId}>Click here to view</a>
        </p>
      );
    }

    return (
      <div className="text-editor">
        <h2>Quill Editor</h2>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Label>Note Title</Form.Label>
            <Form.Control type="text" name="title" placeholder="Enter Title" />
          </Form.Group>
          <Button type="submit">Save Note</Button>
        </Form>
        {status}
        <ReactQuill
          ref={el => {
            this.reactQuillRef = el;
          }}
          theme="snow"
          placeholder="Write your notes here..."
          modules={this.modules}
          formats={this.formats}
          onChange={this.rteChange}
          defaultValue={this.state.editorHtml}
        />
      </div>
    );
  }
}

export default Editor;
