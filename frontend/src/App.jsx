import { useState, useEffect } from 'react'
import axios from 'axios';
import './App.css'
import SearchForm from './components/SearchForm';
import CardList from './components/CardList';
import LoginForm from './components/LoginForm';

function App() {
  const [filters, setFilters] = useState({ blocked: null, cardNumber: '', bank: '' });
  const [cards, setCards] = useState([]);
  const [banks, setBanks] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await axios.get('https://localhost:7099/Card', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
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

    if (token) {
      fetchCards();
    }
  }, [filters, token]);

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

  const handleLoginSubmit = (newToken) => { // Update token in state and local storage
    localStorage.setItem('token', newToken);
    setToken(newToken);
  };

  const handleLogout = () => {
    // Remove the token from local storage
    localStorage.removeItem('token');
  
    // Update the state
    setToken(null);
  };

  if (!token) {
    return <LoginForm onSubmit={handleLoginSubmit} />;
  }

  return (
    <>
      <div className="logout-button-container">
        <button onClick={handleLogout}>Log out</button>
      </div>
      <SearchForm onSubmit={handleSearchSubmit} banks={banks} />
      <CardList cards={cards} banks={banks} />
    </>
  );
}

export default App
