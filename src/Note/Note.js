import React from 'react';
import '../App.css';
import './Note.css'
import { Link } from "react-router-dom";

function Note(){
  return (
    <div>
      <iframe
        title="Dummy PDF"
        className="note-iframe"
        src="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
        frameborder="0"
        height="500"
      >
      </iframe>
      <br></br>
      <p>Report this note if you think it is inappropriate</p>
      <Link to="/reporting">
        <button class="report-button">Report</button>
      </Link>
    </div>
  )
}

export default Note;
