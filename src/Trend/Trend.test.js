import React from 'react';
import Trend from './Trend';

import mockFavorites from '../Favorites/mockFavorites';

import { MemoryRouter } from 'react-router-dom';

import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
jest.mock('../apiCalls');

describe('Colors', () => {

  it('should render correctly for people', () =>{
    const { getByText } = render(
      <MemoryRouter>
        <Trend 
          favorites={mockFavorites}
          type='people'
        />
      </MemoryRouter>
    );

    expect(getByText('artist')).toBeInTheDocument();
    expect(getByText('Unidentified Artist')).toBeInTheDocument();
    expect(getByText('Johann Christian Reinhart')).toBeInTheDocument();
    expect(getByText('Ben Shahn')).toBeInTheDocument();
    expect(getByText('Hamblin Studio')).toBeInTheDocument();
    expect(getByText('Jonas Suyderhoef')).toBeInTheDocument();

  });

  it('should render correctly for colors', () =>{
    const { getByText } = render(
      <MemoryRouter>
        <Trend 
          favorites={mockFavorites}
          type='color'
        />
      </MemoryRouter>
    );

    expect(getByText('color')).toBeInTheDocument();
    expect(getByText('(#c8c8af)')).toBeInTheDocument();
    expect(getByText('(#afafaf)')).toBeInTheDocument();
    expect(getByText('(#afaf96)')).toBeInTheDocument();
    expect(getByText('(#4b4b4b)')).toBeInTheDocument();
    expect(getByText('(#646464)')).toBeInTheDocument();
    
  });

  it('should render correctly for other categories', () =>{
    const { getByText } = render(
      <MemoryRouter>
        <Trend 
          favorites={mockFavorites}
          type='culture'
        />
      </MemoryRouter>
    );

    expect(getByText('culture')).toBeInTheDocument();
    expect(getByText('American')).toBeInTheDocument();
    expect(getByText('German')).toBeInTheDocument();
    expect(getByText('Dutch')).toBeInTheDocument();
    expect(getByText('Spanish')).toBeInTheDocument();
    expect(getByText('Japanese')).toBeInTheDocument();

  });

  it('should not render without a type', () =>{
    const { queryByText } = render(
      <MemoryRouter>
        <Trend 
          favorites={mockFavorites}
          type=''
        />
      </MemoryRouter>
    );

    expect(queryByText('artist')).not.toBeInTheDocument();
    expect(queryByText('culture')).not.toBeInTheDocument();
    expect(queryByText('color')).not.toBeInTheDocument();
    expect(queryByText('century')).not.toBeInTheDocument();
    expect(queryByText('technique')).not.toBeInTheDocument();

  });

});