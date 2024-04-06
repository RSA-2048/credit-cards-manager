import { useState } from 'react'
import axios from 'axios';
import './App.css'
import SearchForm from './components/SearchForm';
import CardList from './components/CardList';
import IncreaseLimitForm from './components/IncreaseLimitForm';

function App() {
  const [filters, setFilters] = useState({ blocked: null, cardNumber: '', bank: '' });
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await axios.get('http://localhost:5000/Card', {
          params: {
            cardNumber: filters.cardNumber,
            BankId: filters.bank,
            isBlocked: filters.blocked,
          },
        });
        setCards(response.data);
      } catch (error) {
        console.error('Failed to fetch cards:', error);
      }
    };

    fetchCards();
  }, [filters]);


  const handleSearchSubmit = (newFilters) => {
    setFilters(newFilters);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const handleIncreaseLimitSubmit = (values) => {
    // Call IncreaseCreditLimit endpoint with selectedCard and values
    // Display notification to user
  };

  return (
    <>
      <SearchForm onSubmit={handleSearchSubmit} />
      <CardList cards={cards} onCardClick={handleCardClick} />
      {selectedCard && (
        <IncreaseLimitForm card={selectedCard} onSubmit={handleIncreaseLimitSubmit} />
      )}
    </>
  );
}


export default App
