import React from 'react';
import FileUpload from './components/FileUpload';
import SearchBar from './components/SearchBar';

const App: React.FC = () => {
  return (
    <div>
      <h1>CSV Uploader and Search</h1>
      <FileUpload />
      <SearchBar />
    </div>
  );
};

export default App;
