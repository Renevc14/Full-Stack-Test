import React from 'react';
import FileUpload from './components/FileUpload';
import SearchBar from './components/SearchBar';
import './App.css';

export const BACKEND_URL = process.env.FRONTEND_URL || "http://localhost:3000"

const App: React.FC = () => {
  return (
    <div>
      <h1>FULL STACK - HOME TEST</h1>
      <FileUpload />
      <SearchBar />
    </div>
  );
};

export default App;
