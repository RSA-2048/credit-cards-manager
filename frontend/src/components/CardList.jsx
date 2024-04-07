import React, { useState } from 'react'
import { Modal, Button } from 'react-bootstrap';
import Card from './Card'
import './CardList.css';
import IncreaseLimitForm from './IncreaseLimitForm';

const CardList = ({ cards }) => {
  const [selectedCard, setSelectedCard] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedCard(null);
    setIsModalOpen(false);
  };

  return (
    <div className="card-list">
      {cards.map(card => (
        <Card key={card.id} cardNumber={card.cardNumber} cardImage={card.image} bankName={card.bankId} onClick={() => handleCardClick(card)} /> 
      ))}
      <Modal show={isModalOpen} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Increase Credit Limit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedCard && <IncreaseLimitForm card={selectedCard} />}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CardList;