import React from 'react';
import '../App.css';
import './Note.css'

function Note(){
  return (
    <iframe
      title="Dummy PDF"
      className="note-iframe"
      src="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
      frameborder="0"
      height="500"
    >
    </iframe>
  )
}

export default Note;
