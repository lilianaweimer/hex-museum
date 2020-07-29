import React from 'react';
import Home from './Home';

import { MemoryRouter } from 'react-router-dom';

import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { fetchTodaysColor } from '../apiCalls';
jest.mock('../apiCalls');

describe('Home', () => {

  it('should render correctly', () =>{
    const { getByText } = render(
      <MemoryRouter>
        <Home 
          todaysColor={{
            color: 'mock color',
            id: 123
          }}
          fetchArt={jest.fn()}
          fetchAllColors={jest.fn()}
        />
      </MemoryRouter>
    );

    const todaysColor = getByText('today\'s color: mock color');
    const todaysGallery = getByText('view today\'s gallery');
    const otherColors = getByText('pick another color');
    const viewFavorites = getByText('view my gallery');

    expect(todaysColor).toBeInTheDocument();
    expect(todaysGallery).toBeInTheDocument();
    expect(otherColors).toBeInTheDocument();
    expect(viewFavorites).toBeInTheDocument();
  });

});