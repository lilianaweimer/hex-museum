import React from 'react';
import './App.css';
import apikey from '../apikey';
import Home from '../Home/Home';
import Error from '../Error/Error';
import Gallery from '../Gallery/Gallery';
import Colors from '../Colors/Colors';

import { fetchTodaysColor, getAllColors, getArt, getReplacement } from '../apiCalls';

import { Switch, Route, Redirect } from 'react-router-dom';

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      today: new Date(),
      isLoading: true,
      todaysColor: {},
      art: {},
      colors: {},
      currentColor: null,
      error: null,
    }
  }

  componentDidMount() {
    fetchTodaysColor(this.getDayOfYear(), apikey)
    .then(
      (data) => this.setState({
      todaysColor: data,
      isLoading: false
    },
    (error) => {
      console.error(error)
      this.setState({
        isLoaded: true,
        error: error
      })
    }
    ))
  }

  loadGallery = (event) => {
    return Object.keys(this.state.art).length 
      ? <Gallery 
          art={this.state.art} 
          currentColor={this.state.currentColor} 
          getNewPiece={this.getNewPiece} 
        /> 
      : <Redirect to='/'/>;
  }

  fetchArt = (color, id) => {
    this.setState({ 
      isLoading: true,
    })
    getArt(color, apikey)
    .then(data => this.setState({
      art: data,
      isLoading: false,
    }))
    .catch(err => console.error(err))
  }

  setCurrentColor = (color) => {
    this.setState({
      currentColor: color
    })
  }

  getNewPiece = (color, id) => {
    let art = this.state.art.records;
    let toRemove = art.find(art => art.objectid === id)
    art.splice(art.indexOf(toRemove), 1)
    getReplacement(color)
      .then(data => this.setState({
        art: { records: [...this.state.art.records, data.records] }
      }))
      .catch(err => console.error(err))
  }

  fetchAllColors = () => {
    this.setState({ isLoading: true })
    getAllColors(apikey)
      .then(data => this.setState({
        isLoading: false,
        colors: data
      }))
      .catch(err => console.error(err))
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
    // console.log(this.state.art);
    if (this.state.isLoading) {
      return (<p className='loading'>Loading...</p>)
    } else if (this.state.error) {
      return <Error error={this.state.error}/>
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
          </Route>
          <Route path='/gallery/:id' render={(event) => this.loadGallery(event)}/>
          <Route exact path='/colors'>
            <Colors 
              colors={this.state.colors.records}
              fetchArt={this.fetchArt}
              setCurrentColor={this.setCurrentColor}
            />
          </Route>
          <Route path='/error'>
            <Error />
          </Route>
        </Switch>
      );
    }
  }
  
}

export default App;
