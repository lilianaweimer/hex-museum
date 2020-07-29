import React from 'react';
import App from './App';

import { MemoryRouter } from 'react-router-dom';

import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { fetchTodaysColor } from '../apiCalls';
jest.mock('../apiCalls');

describe('App', () => {

  fetchTodaysColor.mockResolvedValue({color: 'mock color'})

  it('should render the loading message before mounting', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    const loading = getByText('Loading...');

    expect(loading).toBeInTheDocument();
  });
  
  it('should render correctly after mounting', async () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    const todaysColor = await waitFor(() => getByText('today\'s color: mock color'));
    const todaysGallery = await waitFor(() => getByText('view today\'s gallery'));
    const otherColors = await waitFor(() => getByText('pick another color'));
    const viewFavorites = await waitFor(() => getByText('view my gallery'));

    expect(todaysColor).toBeInTheDocument();
    expect(todaysGallery).toBeInTheDocument();
    expect(otherColors).toBeInTheDocument();
    expect(viewFavorites).toBeInTheDocument();
  }); 

  // it('should be able to go to the all colors page', () => {

  // });

});
