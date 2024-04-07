import React from 'react'
import './Card.css';

const Card = ({cardNumber, cardImage, bankName, onClick}) => {
  return (
    <div className="card" onClick={onClick}>
      <img src={`https://localhost:7099${cardImage}`} alt={cardImage} />
      <h2>{cardNumber}</h2>
      <p>{bankName}</p>
      <div className="card-overlay">
        <span>Increase Credit Limit</span>
      </div>
    </div>
  )
}

export default Card