import React from "react";
import "../App.css";
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";
import ReactHtmlParser from "react-html-parser";
import katex from "katex";
window.katex = katex;

class TextNote extends React.Component {
  constructor(props) {
    super();
    this.props = props;
  }

  // convert delta to html
  render() {
    const converter = new QuillDeltaToHtmlConverter(JSON.parse(this.props.noteText).ops);
    const htmlContent = converter.convert();

    return (
      <div>
        <h1>{this.props.title}</h1>
        {ReactHtmlParser(htmlContent)}
      </div>
    );
  }
}
export default TextNote;
