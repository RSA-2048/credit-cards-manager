import React from 'react'
import Card from './Card'

const CardList = ({ cards }) => {

  return (
    <div>
        {cards.map(card => (
            <Card key={card.id} cardNumber={card.cardNumber} cardImage={card.image} bankName={card.bankId} /> 
        ))}
    </div>
  )
}

export default CardList