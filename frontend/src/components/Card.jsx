import React from 'react'

const Card = ({cardNumber, cardImage, bankName}) => {
  return (
    <div>
        {cardNumber}
        <br />
        {bankName}
        <br />
        <img src={`https://localhost:7099${cardImage}`} alt={cardImage} />
    </div>
  )
}

export default Card