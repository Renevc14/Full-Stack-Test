import React, { useState } from 'react';
import axios from 'axios';

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

      // Asegúrate de que el mensaje es una cadena
      if (typeof response.data === 'object') {
        setMessage(response.data.message || 'File uploaded successfully');
      } else {
        setMessage(response.data);
      }
    } catch (error: any) {
      console.error('Error uploading file:', error);
      // Asegúrate de que el mensaje de error es una cadena
      if (error.response && typeof error.response.data === 'object') {
        setMessage(error.response.data.message || 'File upload failed.');
      } else {
        setMessage('File upload failed.');
      }
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default FileUpload;

