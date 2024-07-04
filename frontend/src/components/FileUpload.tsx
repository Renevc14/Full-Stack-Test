import React, { useState } from 'react';
import axios from 'axios';
import './FileUpload.css';

const FileUpload: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [message, setMessage] = useState<string>('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setMessage('Please select a file first.');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await axios.post('http://localhost:3000/api/files', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (typeof response.data === 'object') {
        setMessage(response.data.message || 'File uploaded successfully');
      } else {
        setMessage(response.data);
      }
    } catch (error: any) {
      console.error('Error uploading file:', error);

      if (error.response && typeof error.response.data === 'object') {
        setMessage(error.response.data.message || 'File upload failed.');
      } else {
        setMessage('File upload failed.');
      }
    }
  };

  return (
    <div>
      <div className="file-upload-container">
        <input type="file" id="file-input" onChange={handleFileChange} />
        <button onClick={handleUpload}>Upload</button>
      </div>
      {message && <p>{message}</p>}
    </div>
  );
};

export default FileUpload;

