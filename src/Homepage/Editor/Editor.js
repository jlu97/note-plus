import React from 'react';
import '../../App.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './Editor.css';

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
    }
  }

  modules = {
    toolbar: [
      [{ 'font': [] }], [{ 'header': [1, 2, 3, 4, 5, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'color': [] }, { 'background': [] }],
      [{'align': [] }, {'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image', 'formula'],
      ['clean']
    ],
    //formula: true
  }

  formats = [
    'font', 'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'color', 'background',
    'align', 'list', 'bullet', 'indent',
    'link', 'image', 'formula'
  ]

  render() {
    return (
      <div className="text-editor">
        <h2>Quill Editor</h2>
        <ReactQuill theme="snow"
                    placeholder= "Write your notes here..."
                    modules={this.modules}
                    formats={this.formats}>
        </ReactQuill>
      </div>
    );
  }
}

export default Editor;
