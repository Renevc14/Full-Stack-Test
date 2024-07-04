import React from 'react';
import FileUpload from './components/FileUpload';
import SearchBar from './components/SearchBar';
import './App.css';

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
