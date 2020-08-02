import React from 'react';
import Gallery from './Gallery';

import { MemoryRouter } from 'react-router-dom';

import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
jest.mock('../apiCalls');

describe('Gallery', () => {

  const mockArt = { records: [
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
    },
    { 
      objectid: 1082297,
      title: 'title',
      primaryimageurl: 'url.png',
      people: [{
        role: 'artist',
        displayname: 'Leo D.V.'
      }],
      culture: 'culture',
      century: 'century',
      period: 'period',
      medium: 'medium', 
      technique: 'technique',
      description: 'description',
      images: [{
        baseimageurl: 'url2.jpg'
      }]
    }
  ]};
  
  const mockFavorites = [];

  it('should render correctly', () =>{
    const { getByText } = render(
      <MemoryRouter>
        <Gallery 
          art={mockArt}
          currentColor={'color'}
          getNewPiece={jest.fn()}
          favorites={mockFavorites}
          toggleFavorite={jest.fn()}
        />
      </MemoryRouter>
    );

    expect(getByText('piece1')).toBeInTheDocument();
    expect(getByText('artist1')).toBeInTheDocument();
    expect(getByText('piece2')).toBeInTheDocument();
    expect(getByText('artist2')).toBeInTheDocument();
  });

  it('should not render if there is no art', () => {
    const { queryByText } = render(
      <MemoryRouter>
        <Gallery 
          art={null}
          currentColor={'color'}
          getNewPiece={jest.fn()}
          favorites={mockFavorites}
          toggleFavorite={jest.fn()}
        />
      </MemoryRouter>
    );

    expect(queryByText('piece1')).not.toBeInTheDocument();
    expect(queryByText('artist1')).not.toBeInTheDocument();
    expect(queryByText('piece2')).not.toBeInTheDocument();
    expect(queryByText('artist2')).not.toBeInTheDocument();
  });

  it('should be able to favorite a piece from gallery', () =>{
    const mockToggleFavorite = jest.fn();
    const { getByTestId } = render(
      <MemoryRouter>
        <Gallery 
          art={mockArt}
          currentColor={'color'}
          getNewPiece={jest.fn()}
          favorites={mockFavorites}
          toggleFavorite={mockToggleFavorite}
        />
      </MemoryRouter>
    );

    fireEvent.click(getByTestId('fave1'));

    expect(mockToggleFavorite).toBeCalledTimes(1);
    expect(mockToggleFavorite).toBeCalledWith(mockArt.records[1], false)
  });

  it('should fire a function if \'more art\' is clicked', () => {
    const mockMoreArt = jest.fn();
    const { getByText } = render(
      <MemoryRouter>
        <Gallery 
          art={mockArt}
          currentColor={'color'}
          getNewPiece={jest.fn()}
          favorites={mockFavorites}
          toggleFavorite={jest.fn()}
          getMoreArt={mockMoreArt}
        />
      </MemoryRouter>
    );

    fireEvent.click(getByText('more art!'));

    expect(mockMoreArt).toBeCalledTimes(1);
    expect(mockMoreArt).toBeCalledWith('/');
  });

  it('should load Loading if loading', () => {
    const { getByAltText } = render(
      <MemoryRouter>
        <Gallery 
          art={mockArt}
          currentColor={'color'}
          getNewPiece={jest.fn()}
          favorites={mockFavorites}
          toggleFavorite={jest.fn()}
          getMoreArt={jest.fn()}
          isLoading={true}
        />
      </MemoryRouter>
    );

    expect(getByAltText('loading')).toBeInTheDocument();
  });


});