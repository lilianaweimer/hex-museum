import React from 'react';
import './App.css';
import Home from '../Home/Home';
import Error from '../Error/Error';
import Gallery from '../Gallery/Gallery';
import Colors from '../Colors/Colors';
import ArtInfo from '../ArtInfo/ArtInfo';
import Favorites from '../Favorites/Favorites';
import Loading from './Loading';
import Footer from '../Footer/Footer';

import { fetchTodaysColor, getAllColors, getArt } from '../apiCalls';

import { Switch, Route, Redirect, Link } from 'react-router-dom';

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      today: new Date(),
      isLoading: true,
      todaysColor: {},
      art: {},
      colors: {},
      favorites: [],
      currentColor: null,
      error: null,
    }
  }

  componentDidMount() {
    this.retrieveFavoritesFromStorage()
    if (!Object.keys(this.state.todaysColor).length) {
      fetchTodaysColor(this.getDayOfYear())
      .then(
        (data) => this.setState({
        todaysColor: data,
        isLoading: false
      },
      (error) => {
        this.setState({
          isLoading: false,
          error: error
        })
      }
      ))
    }
  }

  loadGallery = (event) => {
    if (!this.state.isLoading) {
      return Object.keys(this.state.art).length 
      ?
      <>
      <Gallery 
          art={this.state.art} 
          currentColor={this.state.currentColor} 
          favorites={this.state.favorites}
          toggleFavorite={this.toggleFavorite}
          isLoading={this.state.isLoading}
          getMoreArt={this.getMoreArt} 
        />
        <Footer /> 
      </> 
      : <Redirect to='/'/>;
    } else {
      return <Loading />
    }
  }

  loadArtInfo = (routeProps) => {
    if (this.state.art.records && Object.keys(this.state.art.records).length) {
      let artId = Number(routeProps.match.params.id);
      let foundArt = this.state.art.records.find(piece => piece.objectid === artId);
      return (foundArt ? 
        <>
          <ArtInfo 
            info={foundArt} 
            color={this.state.currentColor}
            favorites={this.state.favorites}
            toggleFavorite={this.toggleFavorite}/>
          <Footer />
        </> : 
        <Error />
      );
    } else if (this.state.favorites.length) {
      let artId = Number(routeProps.match.params.id);
      let foundArt = this.state.favorites.find(piece => piece.objectid === artId);
      return (foundArt ? 
        <>
          <ArtInfo 
            info={foundArt} 
            color={this.state.currentColor}
            favorites={this.state.favorites}
            toggleFavorite={this.toggleFavorite}/>
          <Footer />
        </> : 
        <Error />
      );
    } else {
      return <Redirect to='/'/>
    }
  }

  fetchArt = (color) => {
    this.setState({ isLoading: true })
    getArt(color)
    .then(data => this.setState({
      art: data,
      isLoading: false,
    }))
    .catch(err => {console.error(err)
      this.setState({
        isLoading: false,
        error: err
      })
    })
  }

  getMoreArt = (color) => {
    this.setState({ isLoading: true })
    getArt(color)
    .then(data => this.setState({
      art: { records: [...this.state.art.records, ...data.records]},
      isLoading: false,
    }))
    .catch(err => {console.error(err)
      this.setState({
        isLoading: false,
        error: err
      })
    })
  }

  setCurrentColor = (color) => {
    this.setState({
      currentColor: color
    })
  }

  fetchAllColors = () => {
    this.setState({ isLoading: true })
    getAllColors()
      .then(data => this.setState({
        isLoading: false,
        colors: data
      }))
      .catch(err => {console.error(err)
      this.setState({ 
        isLoading: false,
        error: err})
      })
  }

  toggleFavorite = (piece, isFavorite) => {
    if (isFavorite) {
      let newFavorites = this.state.favorites.filter(favorite => {
        return piece.objectid !== favorite.objectid})
      this.setState({ favorites: newFavorites })
      this.saveFavoritesToStorage(newFavorites)
    } else {
      let newFavorites = [...this.state.favorites, piece]
      this.setState({ favorites: newFavorites })
      this.saveFavoritesToStorage(newFavorites)
    }
  }

  saveFavoritesToStorage = (favorites) => {
    localStorage.setItem('favorites', JSON.stringify(favorites))
  }

  retrieveFavoritesFromStorage = () => {
    if (localStorage.getItem('favorites') !== null) {
      let storedFavorites = JSON.parse(localStorage.getItem('favorites'));
      this.setState({ favorites: [...storedFavorites] })
    }
  }

  getDayOfYear = () => {
    var now = new Date();
    var start = new Date(now.getFullYear(), 0, 0);
    var diff = (now - start) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
    var oneDay = 1000 * 60 * 60 * 24;
    var day = Math.floor(diff / oneDay);
    return day;
  }

  render() {
    if (this.state.isLoading) {
      return (
        <Loading />
      )
    } else if (this.state.error) {
      return <Error error={this.state.error.message}/>
    } else if (!this.state.isLoading && !this.state.error) {
      return (
        <Switch>
          <Route exact path='/'>
            <Home 
              todaysColor={this.state.todaysColor} 
              fetchArt={this.fetchArt}
              fetchAllColors={this.fetchAllColors}
              setCurrentColor={this.setCurrentColor}
            />
            <Footer />
          </Route>
          <Route path='/gallery/:id' render={(event) => this.loadGallery(event)}/>
          <Route exact path='/colors'>
            <Colors 
              colors={this.state.colors.records}
              fetchArt={this.fetchArt}
              setCurrentColor={this.setCurrentColor}
            />
            <Footer />
          </Route>
          <Route path='/piece/:id' render={(routeProps) => this.loadArtInfo(routeProps)}/>
          <Route path='/error'>
            <Error />
          </Route>
          <Route path='/favorites'>
            <Favorites 
              favorites={this.state.favorites}
              toggleFavorite={this.toggleFavorite}
              color={this.state.todaysColor ? this.state.todaysColor.color : '#ffffff'}
            />
          </Route>
          <Route path='/:undefined'>
            <section className='no-faves'>
              <h1>page not found</h1>
              <Link to='/' className='home-nav'>home</Link>
            </section>
          </Route>
        </Switch>
      );
    }
  }
  
}

export default App;
