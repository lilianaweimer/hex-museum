import React from 'react';
import Favorites from './Favorites';

import { MemoryRouter } from 'react-router-dom';

import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
jest.mock('../apiCalls');

describe('Colors', () => {

  const mockArt = [
    {
      objectid: 12345,
      primaryimageurl: 'url1.jpg',
      title: 'piece1',
      people: [{
        displayname: 'artist1'
      }]
    },
    {
      objectid: 54321,
      primaryimageurl: 'url2.png',
      title: 'piece2',
      people: [{
        displayname: 'artist2'
      }]
    }
  ];

  it('should render correctly', () =>{
    const { getByText } = render(
      <MemoryRouter>
        <Favorites 
          favorites={mockArt}
          color={'color'}
          toggleFavorite={jest.fn()}
        />
      </MemoryRouter>
    );

    expect(getByText('piece1')).toBeInTheDocument();
    expect(getByText('artist1')).toBeInTheDocument();
    expect(getByText('piece2')).toBeInTheDocument();
    expect(getByText('artist2')).toBeInTheDocument();
  });

  it('should render message and button if there are no favorites', () => {
    const { getByText, getByRole } = render(
      <MemoryRouter>
        <Favorites 
          favorites={[]}
          color={'color'}
          toggleFavorite={jest.fn()}
        />
      </MemoryRouter>
    );

    expect(getByText('no favorites yet!')).toBeInTheDocument();
    expect(getByRole('link', {name: 'home'})).toBeInTheDocument();
  });

});