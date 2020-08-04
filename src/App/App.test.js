import React from 'react';
import App from './App';
import Loading from './Loading';
import Error from '../Error/Error';

import { MemoryRouter } from 'react-router-dom';

import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { fetchTodaysColor, getAllColors, getArt } from '../apiCalls';
jest.mock('../apiCalls');

describe('App', () => {

  const mockColors = {records: [
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
  ]};

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

  Object.defineProperty(window, 'localStorage', {
    value: {
      getItem: jest.fn(() => null),
      setItem: jest.fn(() => null)
    },
    writable: true
  });

  it('should call localStorage getItem to retrieve favorites on render', () => {
    fetchTodaysColor.mockResolvedValueOnce({color: 'mock color'});
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    expect(localStorage.getItem).toBeCalledTimes(1);
    expect(localStorage.getItem).toBeCalledWith('favorites'); 
  });

  it('should render the loading component before componentDidMount fetch', () => {
    fetchTodaysColor.mockResolvedValueOnce({color: 'mock color'});
    const { getByAltText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    expect(getByAltText('loading')).toBeInTheDocument();
  });
  
  it('should render correctly after componentDidMount fetch', async () => {
    fetchTodaysColor.mockResolvedValueOnce({color: 'mock color'});
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    expect(await waitFor(() => getByText('today\'s color: mock color'))).toBeInTheDocument();
    expect(await waitFor(() => getByText('view today\'s gallery'))).toBeInTheDocument();
    expect(await waitFor(() => getByText('pick another color'))).toBeInTheDocument();
    expect(await waitFor(() => getByText('view my gallery'))).toBeInTheDocument();
  }); 

  it('should be able to go to today\'s gallery', async () => {
    fetchTodaysColor.mockResolvedValueOnce({color: 'mock color'});
    getArt.mockResolvedValueOnce(mockArt);
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    
    fireEvent.click(await waitFor(() => getByText('view today\'s gallery')));
    
    expect(await waitFor(() => getByText('piece1'))).toBeInTheDocument();
    expect(await waitFor(() => getByText('artist1'))).toBeInTheDocument();
    expect(await waitFor(() => getByText('piece2'))).toBeInTheDocument();
    expect(await waitFor(() => getByText('artist2'))).toBeInTheDocument();
  });

  it('should be able to go to a specific art page from today\'s gallery', async () => {
    fetchTodaysColor.mockResolvedValueOnce({color: 'mock color'});
    getArt.mockResolvedValueOnce(mockArt);
    const { getByText, getByTestId } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    fireEvent.click(await waitFor(() => getByText('view today\'s gallery')));
    fireEvent.click(await waitFor(() => getByTestId('2')));

    expect(await waitFor(() => getByText('description'))).toBeInTheDocument();
  }); 

  it('should be able to go to the all colors page', async () => {
    fetchTodaysColor.mockResolvedValueOnce({color: 'mock color'});
    getAllColors.mockResolvedValueOnce(mockColors);
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    fireEvent.click(await waitFor(() => getByText('pick another color')));

    expect(await waitFor(() => getByText('color one'))).toBeInTheDocument();
    expect(await waitFor(() => getByText('color two'))).toBeInTheDocument();
    expect(await waitFor(() => getByText('color three'))).toBeInTheDocument();
  });

  it('should be able to go to a piece\'s info page from the all colors page', async () => {
    fetchTodaysColor.mockResolvedValueOnce({color: 'mock color'});
    getAllColors.mockResolvedValueOnce(mockColors);
    getArt.mockResolvedValueOnce(mockArt);
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
    fetchTodaysColor.mockResolvedValueOnce({color: 'mock color'});
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    fireEvent.click(await waitFor(() => getByText('view my gallery')));
    
    expect(getByText('no favorites yet!')).toBeInTheDocument();
  });

  it('should call localStorage setItem when favorite or unfavorite is clicked', async () => {
    fetchTodaysColor.mockResolvedValueOnce({color: 'mock color'});
    getArt.mockResolvedValueOnce(mockArt);
    const { getByText, getByTestId } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    
    fireEvent.click(await waitFor(() => getByText('view today\'s gallery')));
    fireEvent.click(await waitFor(() => getByTestId('fave2')));

    expect(localStorage.setItem).toBeCalledTimes(1);
  });

  it('should be able to go to a piece\'s page from favorites', async () => {
    fetchTodaysColor.mockResolvedValueOnce({color: 'mock color'});
    getArt.mockResolvedValueOnce(mockArt);
    const { getByText, getByTestId } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    
    fireEvent.click(await waitFor(() => getByText('view today\'s gallery')));
    fireEvent.click(await waitFor(() => getByTestId('fave2')));
    fireEvent.click(getByText('home'));
    fireEvent.click(await waitFor(() => getByText('view my gallery')));

    expect(getByText('Leo D.V.')).toBeInTheDocument(); 

    fireEvent.click(getByTestId('1082297'));
    
    expect(getByText('description')).toBeInTheDocument();

  });

  it('should go to error page if no colors come back from the api and user tries to view colors', async () => {
    fetchTodaysColor.mockResolvedValueOnce({color: 'mock color'});
    getAllColors.mockRejectedValueOnce({message: 'uh oh!!!!!!'});
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    fireEvent.click(await waitFor(() => getByText('pick another color')));

    expect(await waitFor(() => getByText('uh oh!!!!!!'))).toBeInTheDocument();
  });

  it('should go to error page if no art comes back from the api and user tries to view art', async () => {
    fetchTodaysColor.mockResolvedValueOnce({color: 'mock color'});
    getArt.mockRejectedValueOnce({message: 'uh oh!!!!!!'});
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    fireEvent.click(await waitFor(() => getByText('view today\'s gallery')));

    expect(await waitFor(() => getByText('uh oh!!!!!!'))).toBeInTheDocument();
  });

});

describe('Loading', () => {

  it('should render', () => {
    const { getByAltText } = render(
      <MemoryRouter>
        <Loading />
      </MemoryRouter>
    );

    expect(getByAltText('loading')).toBeInTheDocument();
  });

});

describe('Error', () => {

  it('should render with props', () => {
    const { getByText } = render(
      <MemoryRouter>
        <Error error={'test error!'}/>
      </MemoryRouter>
    );

    expect(getByText('test error!')).toBeInTheDocument();
  }); 

  it('should render without props', () => {
    const { getByText } = render(
      <MemoryRouter>
        <Error error={null}/>
      </MemoryRouter>
    );

    expect(getByText('something went wrong')).toBeInTheDocument();
  }); 

});
