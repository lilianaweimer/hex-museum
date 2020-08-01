import React from 'react';
import Colors from './Colors';

import { MemoryRouter } from 'react-router-dom';

import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
jest.mock('../apiCalls');

describe('Colors', () => {

  const mockColors = [
    {
      hex: 12345,
      id: 54321,
      name: 'color1'
    },
    {
      hex: 67890,
      id: 9876,
      name: 'color2'
    }
  ]

  it('should render correctly', () =>{
    const { getByText } = render(
      <MemoryRouter>
        <Colors 
          colors={mockColors}
          fetchArt={jest.fn()}
        />
      </MemoryRouter>
    );

    expect(getByText('home')).toBeInTheDocument();
    expect(getByText('color1')).toBeInTheDocument();
    expect(getByText('color2')).toBeInTheDocument();
    expect(getByText('12345')).toBeInTheDocument();
    expect(getByText('67890')).toBeInTheDocument();
  });

  it('should not render if there are no colors', () => {
    const { queryByText } = render(
      <MemoryRouter>
        <Colors 
          colors={null}
          fetchArt={jest.fn()}
        />
      </MemoryRouter>
    );

    expect(queryByText('home')).not.toBeInTheDocument();
    expect(queryByText('color1')).not.toBeInTheDocument();
    expect(queryByText('color2')).not.toBeInTheDocument();
    expect(queryByText('12345')).not.toBeInTheDocument();
    expect(queryByText('67890')).not.toBeInTheDocument();
  });

  it('should fire a function when a color is clicked', () => {
    const mockFetchArt = jest.fn();
    const { getByTestId } = render(
      <MemoryRouter>
        <Colors 
          colors={mockColors}
          fetchArt={mockFetchArt}
          setCurrentColor={jest.fn()}
        />
      </MemoryRouter>
    );

    const color = getByTestId('0');

    fireEvent.click(color);

    expect(mockFetchArt).toHaveBeenCalledTimes(1);
    expect(mockFetchArt).toHaveBeenCalledWith(9876);
  });

});