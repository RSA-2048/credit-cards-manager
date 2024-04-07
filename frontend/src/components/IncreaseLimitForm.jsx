import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';

const IncreaseLimitForm = ({ card, onSuccess }) => {
  const [requestedLimit, setRequestedLimit] = useState('');
  const [occupation, setOccupation] = useState('');
  const [monthlyIncome, setMonthlyIncome] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    if (card.isBlocked) {
      alert('This card is blocked and cannot have its limit increased.');
    } else {
      // Prepare the data to send in the request body
      const data = {
        cardId: card.id,
        requestedCreditLimit: requestedLimit,
        occupation: occupation,
        averageMonthlyIncome: monthlyIncome
      };

      axios.post('https://localhost:7099/Card', data)
        .then(response => { // Handle successful response
          alert(response.data);
          if (onSuccess) {
            onSuccess(); // if the request was successful, we cakk the onSuccess callback that closes the modal
          }
        })
        .catch(error => { // Handle error
          if (error.response) {
            // The increase credit limit request was denied by the server (the reason will be in the response body)
            alert(error.response.data);
          } else if (error.request) {
            // The request was made but no response was received
            alert('No response received from the server.');
          } else {
            // Something happened in setting up the request that triggered an Error
            alert('An error occurred while submitting the request.');
          }
        });
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