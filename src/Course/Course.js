import React from 'react';
import '../App.css';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

function Course() {
  return (
    <div>
      <h1>Programming Languages</h1>
      <h2>Notes</h2>
      <br/>
      <Link to="/upload">
        <Button>Upload Note</Button>
      </Link>
      <br/><br/>

      <Table>
        <tr>
          <th>Title</th>
          <th>Date</th>
          <th>Author</th>
        </tr>
        <tr>
          <td>
            <Link to="/note">
              Lorem Ipsum
            </Link>
          </td>
          <td>01/01/20</td>
          <td>Jayson Isaac</td>
        </tr>
      </Table>
    </div>
  )
}

export default Course;
