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

  it('should not render if there is no color prop', () =>{
    const { queryByText } = render(
      <MemoryRouter>
        <Home 
          todaysColor={null}
          fetchArt={jest.fn()}
          fetchAllColors={jest.fn()}
        />
      </MemoryRouter>
    );

    expect(queryByText('today\'s color: mock color')).not.toBeInTheDocument();
    expect(queryByText('view today\'s gallery')).not.toBeInTheDocument();
    expect(queryByText('pick another color')).not.toBeInTheDocument();
    expect(queryByText('view my gallery')).not.toBeInTheDocument();
  });

  it('should fire a function if view todays gallery is clicked', () => {
    const mockFetchArt = jest.fn();
    const { getByText, debug } = render(
      <MemoryRouter>
        <Home 
          todaysColor={{
            color: 'mock color',
            id: 123
          }}
          fetchArt={mockFetchArt}
          fetchAllColors={jest.fn()}
        />
      </MemoryRouter>
    );

    const todaysGallery = getByText('view today\'s gallery');

    fireEvent.click(todaysGallery);

    expect(mockFetchArt).toHaveBeenCalledTimes(1);
    expect(mockFetchArt).toHaveBeenCalledWith({color: 'mock color', id: 123});
  });

  it('should fire a function if pick another color is clicked', () => {
    const mockFetchAllColors = jest.fn();
    const { getByText, debug } = render(
      <MemoryRouter>
        <Home 
          todaysColor={{
            color: 'mock color',
            id: 123
          }}
          fetchArt={jest.fn()}
          fetchAllColors={mockFetchAllColors}
        />
      </MemoryRouter>
    );

    const allColors = getByText('pick another color');

    fireEvent.click(allColors);

    expect(mockFetchAllColors).toHaveBeenCalledTimes(1);
  });

});