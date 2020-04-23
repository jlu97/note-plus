import React from "react";

class PDFNote extends React.Component {
  constructor(props) {
    super();
    this.props = props;
  }

  render() {
    const noteBody = this.props.noteBody.map((page, index) => {
      return (
        <iframe
          key={index.toString()}
          title={this.props.title}
          className="note-iframe"
          src={"data:application/pdf;base64," + page}
          frameBorder="0"
          height="500"
        />
      );
    });

    return (
      <div>
        <h1>HELLO WORLD</h1>
        <h1>{this.props.title}</h1>
        {noteBody}
        <br />
      </div>
    );
  }
}

export default PDFNote;
