import React, { useState } from 'react';
import axios from 'axios';
import './SearchBar.css';

interface UserData {
  name: string;
  city: string;
  country: string;
  favorite_sport: string;
}

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [results, setResults] = useState<UserData[]>([]);

  const handleSearch = async () => {
    console.log(query)
    try {
      const response = await axios.get<any>(`http://localhost:3000/api/users?q=${query}`);
        setResults(response.data.data);
        console.log(response.data.data); // Verifica los datos en la consola
    } catch (error) {
      console.error('Error searching:', error);
      setResults([]);
    }
  };

  return (
    <div className="search-container">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="input-search"
        placeholder="Search users..."
      />
      <button onClick={handleSearch} className="button-search">
        Search
      </button>
      <div className="user-list">
        {results.map((user, index) => (
          <div key={index} className="user-card">
            <div>
              <strong>Name:</strong> {user.name}<br />
              <strong>City:</strong> {user.city}<br />
              <strong>Country:</strong> {user.country}<br />
              <strong>Favorite Sport:</strong> {user.favorite_sport}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;
