import React from 'react';
import { Link } from "react-router-dom";
import '../../App.css';
import './Editor.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import katex from 'katex';
import 'katex/dist/katex.min.css';

window.katex = katex;

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
    }
    this.rteChange = this.rteChange.bind(this);
  }

  modules = {
    toolbar: [
      [{ 'font': [] }], [{ 'header': [1, 2, 3, 4, 5, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'color': [] }, { 'background': [] }],
      [{'align': [] }, {'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['code-block'],
      ['link', 'image', 'formula'],
      ['clean']
    ],
    formula: true
  }

  formats = [
    'font', 'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'color', 'background',
    'align', 'list', 'bullet', 'indent',
    'code-block',
    'link', 'image', 'formula'
  ]

  // save delta object in deltaObj when user make change
  rteChange = (content, delta, source, editor) => {
    var deltaObj = editor.getContents();
    console.log(deltaObj); // delta object
		//console.log(editor.getHTML()); // rich text
		//console.log(editor.getText()); // plain text
		//console.log(editor.getLength()); // number of characters
	}

  // just need to save deltaObj in the database when the save button is pressed.
  // now the save note button only return an html with sample delta object.
  render() {
    return (
      <div className="text-editor">
        <h2>Quill Editor</h2>
        <Link to="/returnNote">
            <button>Save Note</button>
        </Link>
        <ReactQuill theme="snow"
                    placeholder= "Write your notes here..."
                    modules={this.modules}
                    formats={this.formats}
                    onChange={this.rteChange}
                    >
        </ReactQuill>
      </div>
    );
  }
}

export default Editor;
