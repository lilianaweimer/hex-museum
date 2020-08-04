import React from 'react';
import ArtInfo from './ArtInfo';

import { MemoryRouter } from 'react-router-dom';

import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

describe('ArtInfo', () => {

  const mockInfoOne = { 
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

  const mockInfoTwo = { 
    title: 'title',
    primaryimageurl: 'url.png',
    people: [],
    culture: 'culture',
    century: null,
    period: 'period',
    medium: null, 
    technique: 'technique',
    description: null,
    images: []
  };

  it('should render correctly', () =>{
    const { getByText } = render(
      <MemoryRouter>
        <ArtInfo 
          info={mockInfoOne}
          color={'color'}
          favorites={[]}
          toggleFavorite={jest.fn()}
        />
      </MemoryRouter>
    );

    expect(getByText('title')).toBeInTheDocument();
    expect(getByText('artist: Leo D.V.')).toBeInTheDocument();
    expect(getByText('culture')).toBeInTheDocument();
    expect(getByText('century')).toBeInTheDocument();
    expect(getByText('period')).toBeInTheDocument();
    expect(getByText('medium')).toBeInTheDocument();
    expect(getByText('technique')).toBeInTheDocument();
    expect(getByText('description')).toBeInTheDocument();
  });

  it('should still render if missing some info', () => {
    const { getByText, queryByText } = render(
      <MemoryRouter>
        <ArtInfo 
          info={mockInfoTwo}
          color={'color'}
          favorites={[]}
          toggleFavorite={jest.fn()}
        />
      </MemoryRouter>
    );

    expect(getByText('title')).toBeInTheDocument();
    expect(getByText('culture')).toBeInTheDocument();
    expect(getByText('period')).toBeInTheDocument();
    expect(getByText('technique')).toBeInTheDocument();

    expect(queryByText('artist: Leo D.V.')).not.toBeInTheDocument();
    expect(queryByText('century')).not.toBeInTheDocument();
    expect(queryByText('medium')).not.toBeInTheDocument();
    expect(queryByText('description')).not.toBeInTheDocument();
  });

  it('can favorite a piece', () => {
    const mockToggleFavorite = jest.fn();
    const { getByTestId } = render(
      <MemoryRouter>
        <ArtInfo 
          info={mockInfoOne}
          color={'color'}
          favorites={[]}
          toggleFavorite={mockToggleFavorite}
        />
      </MemoryRouter>
    );

    fireEvent.click(getByTestId('fave-btn'));

    expect(mockToggleFavorite).toBeCalledTimes(1);
    expect(mockToggleFavorite).toBeCalledWith(mockInfoOne, false)
  });

});