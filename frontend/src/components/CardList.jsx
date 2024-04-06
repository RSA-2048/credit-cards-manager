import React from 'react'
import Card from './Card'

const CardList = ({ cards }) => {

  return (
    <div>
        {cards.map(card => (
            <Card key={card.id} cardNumber={card.cardNumber} cardImage={card.cardImage} bankName={card.bank.name} />
        ))}
    </div>
  )
}

export default CardList