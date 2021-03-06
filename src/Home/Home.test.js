import React from 'react';
import Home from './Home';

import { MemoryRouter } from 'react-router-dom';

import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

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
          setCurrentColor={jest.fn()}
        />
      </MemoryRouter>
    );

    expect(getByText('today\'s color: mock color')).toBeInTheDocument();
    expect(getByText('view today\'s gallery')).toBeInTheDocument();
    expect(getByText('pick another color')).toBeInTheDocument();
    expect(getByText('view my gallery')).toBeInTheDocument();
  });

  it('should not render if there is no color prop', () =>{
    const { queryByText } = render(
      <MemoryRouter>
        <Home 
          todaysColor={null}
          fetchArt={jest.fn()}
          fetchAllColors={jest.fn()}
          setCurrentColor={jest.fn()}
        />
      </MemoryRouter>
    );

    expect(queryByText('today\'s color: mock color')).not.toBeInTheDocument();
    expect(queryByText('view today\'s gallery')).not.toBeInTheDocument();
    expect(queryByText('pick another color')).not.toBeInTheDocument();
    expect(queryByText('view my gallery')).not.toBeInTheDocument();
  });

  it('should fire a function if view today\'s gallery is clicked', () => {
    const mockFetchArt = jest.fn();
    const { getByText } = render(
      <MemoryRouter>
        <Home 
          todaysColor={{
            color: 'mock color',
            id: 123
          }}
          fetchArt={mockFetchArt}
          fetchAllColors={jest.fn()}
          setCurrentColor={jest.fn()}
        />
      </MemoryRouter>
    );

    fireEvent.click(getByText('view today\'s gallery'));

    expect(mockFetchArt).toHaveBeenCalledTimes(1);
    expect(mockFetchArt).toHaveBeenCalledWith({color: 'mock color', id: 123});
  });

  it('should fire a function if pick another color is clicked', () => {
    const mockFetchAllColors = jest.fn();
    const { getByText } = render(
      <MemoryRouter>
        <Home 
          todaysColor={{
            color: 'mock color',
            id: 123
          }}
          fetchArt={jest.fn()}
          fetchAllColors={mockFetchAllColors}
          setCurrentColor={jest.fn()}
        />
      </MemoryRouter>
    );

    fireEvent.click(getByText('pick another color'));

    expect(mockFetchAllColors).toHaveBeenCalledTimes(1);
  });

});