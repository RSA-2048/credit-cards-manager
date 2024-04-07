import React, { useState } from 'react'
import { Modal, Button } from 'react-bootstrap';
import Card from './Card'
import './CardList.css';
import IncreaseLimitForm from './IncreaseLimitForm';

const CardList = ({ cards, banks }) => {
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
      {cards.map(card => {
        // Find the bank name for the card (cards hold the bank ID, not the name)
        const bank = banks.find(bank => bank.id === card.bankId);
        const bankName = bank ? bank.name : 'Unknown';
        return (
          <Card key={card.id} cardNumber={card.cardNumber} cardImage={card.image} bankName={bankName} onClick={() => handleCardClick(card)} />
        );
      })}
      <Modal show={isModalOpen} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Increase Credit Limit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedCard && <IncreaseLimitForm card={selectedCard} onSuccess={handleCloseModal} />}
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