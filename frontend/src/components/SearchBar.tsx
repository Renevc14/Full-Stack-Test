import React, { useState } from 'react';
import axios from 'axios';

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
    try {
      const response = await axios.get<UserData[]>(`http://localhost:3000/api/users?q=${query}`);
      if (Array.isArray(response.data)) {
        setResults(response.data);
        console.log(response.data); // Verifica los datos en la consola
      } else {
        console.error('Received data is not an array:', response.data);
        setResults([]); // Manejo de caso donde no se recibe un arreglo válido
      }
    } catch (error) {
      console.error('Error searching:', error);
      setResults([]); // Manejo de error: podría mostrar un mensaje de error al usuario
    }
  };

  return (
    <div>
      <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
      <button onClick={handleSearch}>Search</button>
      <ul>
        {results.map((item, index) => (
          <li key={index}>
            <p>Name: {item.name}</p>
            <p>City: {item.city}</p>
            <p>Country: {item.country}</p>
            <p>Favorite Sport: {item.favorite_sport}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchBar;
