import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import './SearchForm.css';

function SearchForm({ onSubmit }) {
  const [cardNumber, setCardNumber] = useState('');
  const [bank, setBank] = useState('');
  const [isBlocked, setIsBlocked] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    let blocked = isBlocked;
    if (isBlocked === "true") {
      blocked = true;
    } else if (isBlocked === "false") {
      blocked = false;
    } else {
      blocked = null;
    }
    onSubmit({ cardNumber, bank, blocked });
  };

  return (
    <div className="form-container">
      <Form onSubmit={handleSubmit} >
        <Form.Group as={Row} controlId="formCardNumber" className="mb-2">
          <Form.Label column sm={3}>Card Number :</Form.Label>
          <Col sm={9}>
            <Form.Control type="text" value={cardNumber} onChange={e => setCardNumber(e.target.value)} />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="formBank" className="mb-2">
          <Form.Label column sm={3}>Bank :</Form.Label>
          <Col sm={9}>
            <Form.Control type="text" value={bank} onChange={e => setBank(e.target.value)} />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="formIsBlocked" className="mb-2">
          <Form.Label column sm={3}>Blocked?</Form.Label>
          <Col sm={9}>
            <Form.Control as="select" value={isBlocked} onChange={e => setIsBlocked(e.target.value)}>
              <option value="">All</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </Form.Control>
          </Col>
        </Form.Group>
        <Button variant="primary" type="submit" className="mb-4">Search</Button>
      </Form>
    </div>
  );
}

export default SearchForm;