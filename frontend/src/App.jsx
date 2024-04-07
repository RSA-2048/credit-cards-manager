import { useState, useEffect } from 'react'
import axios from 'axios';
import './App.css'
import SearchForm from './components/SearchForm';
import CardList from './components/CardList';
import IncreaseLimitForm from './components/IncreaseLimitForm';

function App() {
  const [filters, setFilters] = useState({ blocked: null, cardNumber: '', bank: '' });
  const [cards, setCards] = useState([]);
  const [banks, setBanks] = useState([]);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await axios.get('https://localhost:7099/Card', {
          params: {
            cardNumber: filters.cardNumber,
            BankId: filters.bank,
            isBlocked: filters.blocked,
          },
        });
        console.log('Fetched cards:', response.data);
        setCards(response.data);
      } catch (error) {
        console.error('Failed to fetch cards:', error);
      }
    };

    fetchCards();
  }, [filters]);

  useEffect(() => {
    const fetchBanks = async () => {
      try {
        const response = await axios.get('https://localhost:7099/Bank');
        console.log('Fetched banks:', response.data);
        setBanks(response.data);
      } catch (error) {
        console.error('Failed to fetch banks data:', error);
      }
    };

    fetchBanks();
  }, []);


  const handleSearchSubmit = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <>
      <SearchForm onSubmit={handleSearchSubmit} banks={banks} />
      <CardList cards={cards} banks={banks} />
    </>
  );
}


export default App
