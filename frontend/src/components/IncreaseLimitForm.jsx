import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const IncreaseLimitForm = ({ card }) => {
  const [requestedLimit, setRequestedLimit] = useState('');
  const [occupation, setOccupation] = useState('');
  const [monthlyIncome, setMonthlyIncome] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    if (card.isBlocked) {
      alert('This card is blocked and cannot have its limit increased.');
    } else {
      // TODO: Call an API to increase the credit limit
      alert('Credit limit increase request submitted.');
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formRequestedLimit">
        <Form.Label>Requested Credit Limit Amount</Form.Label>
        <Form.Control type="number" value={requestedLimit} onChange={(e) => setRequestedLimit(e.target.value)} />
      </Form.Group>
      <Form.Group controlId="formOccupation">
        <Form.Label>Occupation</Form.Label>
        <Form.Control as="select" value={occupation} onChange={(e) => setOccupation(e.target.value)}>
          <option value="">Select...</option>
          <option value="employee">Employee</option>
          <option value="self-employed">Self-Employed</option>
          <option value="other">Other</option>
        </Form.Control>
      </Form.Group>
      <Form.Group controlId="formMonthlyIncome">
        <Form.Label>Average Monthly Income</Form.Label>
        <Form.Control type="number" value={monthlyIncome} onChange={(e) => setMonthlyIncome(e.target.value)} />
      </Form.Group>
      <Button variant="primary" type="submit" disabled={card.isBlocked}>
        Increase Credit Limit
      </Button>
    </Form>
  );
};

export default IncreaseLimitForm;