import React from 'react';
import '../App.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class UploadNote extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fileInput = React.createRef();
  }
  handleSubmit(event) {
    event.preventDefault();
    alert(
      `Selected file - ${
        this.fileInput.current.files[0].name
      }`
    );
  }

  render() {
    // TODO ADD FIELDS FOR NAME ETC.
    return (
      <Form onSubmit={this.handleSubmit}>
        <h1>Upload Note</h1>
        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" placeholder="Title"/>
        </Form.Group>

        <Form.Group>
          <Form.Control type="file" ref={this.fileInput} />
        </Form.Group>
        <Button type="submit">Submit</Button>
      </Form>
    );
  }
}

export default UploadNote;
