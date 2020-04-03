import React from 'react';
import '../App.css';
import '../Homepage/Login/Login.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function Reporting(){
    return (
        <div className="reporting-container">
            <h2>Reporting</h2>
            <Form>
                <Form.Group controlId="Name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="name" placeholder="Enter your name"/>
                </Form.Group>
                <Form.Group controlId="reason">
                    <Form.Label>Reason</Form.Label>
                    <Form.Control type="reason" placeholder="Reason for reporting"/>
                </Form.Group>
                <Button variant="primary" type="submit">Submit</Button>
            </Form>
        </div>
    )
  }
  
  export default Reporting;