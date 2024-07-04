import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';
import axios from 'axios';

jest.mock('axios');


test('renders App component and its children', () => {
  render(<App />);


  expect(screen.getByText(/FULL STACK - HOME TEST/i)).toBeInTheDocument();


  expect(screen.getByText(/Upload/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/Search users\.\.\./i)).toBeInTheDocument();
});


test('search bar handles user search and displays results', async () => {
  render(<App />);

  
  const searchInput = screen.getByPlaceholderText(/Search users\.\.\./i) as HTMLInputElement;
  fireEvent.change(searchInput, { target: { value: 'John' } });


  expect(searchInput.value).toBe('John');


  const mockUserData = [
    { name: 'John Doe', city: 'New York', country: 'USA', favorite_sport: 'Basketball' },
    { name: 'Jane Doe', city: 'Los Angeles', country: 'USA', favorite_sport: 'Soccer' },
  ];

  (axios.get as jest.Mock).mockResolvedValueOnce({ data: { data: mockUserData } });


  fireEvent.click(screen.getByText(/Search/i));


  await waitFor(() => {
    expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
    expect(screen.getByText(/Jane Doe/i)).toBeInTheDocument();
  });
});

