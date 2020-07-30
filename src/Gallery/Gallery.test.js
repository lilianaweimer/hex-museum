import React from 'react';
import Gallery from './Gallery';

import { MemoryRouter } from 'react-router-dom';

import { render, fireEvent, waitFor, queryByText } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { fetchTodaysColor } from '../apiCalls';
jest.mock('../apiCalls');

describe('Colors', () => {

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
    }
  ]}

  it('should render correctly', () =>{
    const { getByText } = render(
      <MemoryRouter>
        <Gallery 
          art={mockArt}
          currentColor={'color'}
          getNewPiece={jest.fn()}
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
        />
      </MemoryRouter>
    );

    expect(queryByText('piece1')).not.toBeInTheDocument();
    expect(queryByText('artist1')).not.toBeInTheDocument();
    expect(queryByText('piece2')).not.toBeInTheDocument();
    expect(queryByText('artist2')).not.toBeInTheDocument();
  });

});