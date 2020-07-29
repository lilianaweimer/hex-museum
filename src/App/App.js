import React from 'react';
import './App.css';
import Home from '../Home/Home';
import Error from '../Error/Error';
import Gallery from '../Gallery/Gallery';
import Colors from '../Colors/Colors';

import { fetchTodaysColor, getAllColors, getArt } from '../apiCalls';

import { Switch, Route } from 'react-router-dom';

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      apikey: '18c3325e-bd93-4663-98ca-c165cdde5592',
      today: new Date(),
      isLoading: true,
      todaysColor: {},
      art: {},
      colors: {},
      error: null,
    }
  }

  componentDidMount() {
    fetchTodaysColor(this.getDayOfYear(), this.state.apikey)
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

  loadGallery = (routerProps) => {
    this.fetchArt(routerProps);
    return <Gallery art={this.state.art} />
  }

  fetchArt = (routerProps) => {
    let color = routerProps.match.params.id;
    getArt(color, this.state.apikey)
    .then(data => this.setState({
      art: data,
    }))
    .catch(err => console.error(err))
  }

  fetchAllColors = () => {
    this.setState({ isLoading: true })
    getAllColors(this.state.apikey)
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
      return <p>{this.state.error}</p>
    } else if (!this.state.isLoading && !this.state.error) {
      return (
        <Switch>
          <Route exact path='/'>
            <Home 
              todaysColor={this.state.todaysColor} 
              fetchArt={this.fetchArt}
              fetchAllColors={this.fetchAllColors}
            />
          </Route>
          <Route path='/gallery/:id' render={(routerProps) => this.loadGallery(routerProps)}/>
          <Route exact path='/colors'>
            <Colors 
              colors={this.state.colors.records}
            />
          </Route>
        </Switch>
      );
    }
  }
  
}

export default App;
