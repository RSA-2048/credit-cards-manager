import React from 'react'
import './Card.css';

const Card = ({cardNumber, cardImage, bankName, onClick}) => {
  return (
    <div className="card" onClick={onClick}>
      <img src={`https://localhost:7099${cardImage}`} alt={cardImage} />
      <p>Card Number :</p>
      <h2 className="cardNumber">{cardNumber}</h2>
      <p>Bank : <b>{bankName}</b></p>
      <div className="card-overlay">
        <span>Increase Credit Limit</span>
      </div>
    </div>
  )
}

export default Card