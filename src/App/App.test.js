import React from 'react';
import App from './App';

import { MemoryRouter } from 'react-router-dom';

import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { fetchTodaysColor } from '../apiCalls';
jest.mock('../apiCalls');

describe('App', () => {

  fetchTodaysColor.mockResolvedValue({})

  it('should render correctly', async () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    const todaysColor = await waitFor(() => getByText('today\'s color:'));
  }); 

});
