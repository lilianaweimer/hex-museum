import React from 'react';
import App from './App';

import { MemoryRouter } from 'react-router-dom';

import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { fetchTodaysColor, getAllColors, getArt } from '../apiCalls';
jest.mock('../apiCalls');

describe('App', () => {

  fetchTodaysColor.mockResolvedValue({color: 'mock color'});

  getAllColors.mockResolvedValue({records: [
    {
      name: 'color one',
      hex: '#123456',
      id: 123456
    },
    {
      name: 'color two',
      hex: '#ABCDE',
      id: 234546
    },
    {
      name: 'color three',
      hex: '#w38i7d',
      id: 674843239
    }
  ]});

  getArt.mockResolvedValue({ records: [
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
  ]});

  it('should render the loading component before componentDidMount fetch', () => {
    const { getByAltText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    const loading = getByAltText('loading');

    expect(loading).toBeInTheDocument();
  });
  
  it('should render correctly after componentDidMount fetch', async () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    const todaysColor = await waitFor(() => getByText('today\'s color: mock color'));
    const todaysGallery = await waitFor(() => getByText('view today\'s gallery'));
    const otherColors = await waitFor(() => getByText('pick another color'));
    const viewFavorites = await waitFor(() => getByText('view my gallery'));

    expect(todaysColor).toBeInTheDocument();
    expect(todaysGallery).toBeInTheDocument();
    expect(otherColors).toBeInTheDocument();
    expect(viewFavorites).toBeInTheDocument();
  }); 

  it('should be able to go to today\'s gallery', async () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    const todaysGallery = await waitFor(() => getByText('view today\'s gallery'));
    
    fireEvent.click(todaysGallery);
    
    
    const pieceOne = await waitFor(() => getByText('piece1'))
    const artistOne = await waitFor(() => getByText('artist1'))
    const pieceTwo = await waitFor(() => getByText('piece2'))
    const artistTwo = await waitFor(() => getByText('artist2'));
    
    expect(pieceOne).toBeInTheDocument();
    expect(artistOne).toBeInTheDocument();
    expect(pieceTwo).toBeInTheDocument();
    expect(artistTwo).toBeInTheDocument();
  });

  it('should be able to go to a specific art page from today\'s gallery', async () => {
    const { getByText, getByTestId } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    const todaysGallery = await waitFor(() => getByText('view today\'s gallery'));
    
    fireEvent.click(todaysGallery);
    
    const aboutButton = await waitFor(() => getByTestId('2'));

    fireEvent.click(aboutButton);
    
    const description = await waitFor(() => getByText('description'));

    expect(description).toBeInTheDocument();
  }); 

  it('should be able to go to the all colors page', async () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    const otherColors = await waitFor(() => getByText('pick another color'));
    
    fireEvent.click(otherColors);

    const colorOne = await waitFor(() => getByText('color one'))
    const colorTwo = await waitFor(() => getByText('color two'))
    const colorThree = await waitFor(() => getByText('color three'))
    
    expect(colorOne).toBeInTheDocument();
    expect(colorTwo).toBeInTheDocument();
    expect(colorThree).toBeInTheDocument();
  });

  it('should be able to go to a piece\'s info page from the all colors page', async () => {
    const { getByText, getByTestId } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    
    fireEvent.click(await waitFor(() => getByText('pick another color')));
    
    fireEvent.click(await waitFor(() => getByText('color one')));

    expect(await waitFor(() => getByText('piece1'))).toBeInTheDocument();

    fireEvent.click(getByTestId('2'));

    expect(getByText('artist: Leo D.V.')).toBeInTheDocument();
  });

  it('should be able to go to the favorites page', async () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    const favorites = await waitFor(() => getByText('view my gallery'));
    
    fireEvent.click(favorites);
    
    expect(getByText('no favorites yet!')).toBeInTheDocument();
  });

});
