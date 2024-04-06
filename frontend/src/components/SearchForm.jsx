import React, { useState } from 'react';

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
    <form onSubmit={handleSubmit}>
      <label>
        Card Number:
        <input type="text" value={cardNumber} onChange={e => setCardNumber(e.target.value)} />
      </label>
      <label>
        Bank:
        <input type="text" value={bank} onChange={e => setBank(e.target.value)} />
      </label>
      <label>
        Is Blocked:
        <select value={isBlocked} onChange={e => setIsBlocked(e.target.value)}>
          <option value="">All</option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      </label>
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchForm;