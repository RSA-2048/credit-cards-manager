import React from 'react'

const Card = ({cardNumber, cardImage, bankName}) => {
  return (
    <div>
        {cardNumber}
        {bankName}
        <image src={cardImage} alt="Card Image" />
    </div>
  )
}

export default Card