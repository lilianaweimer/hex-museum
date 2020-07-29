import React from 'react';
import './App.css';
import Home from '../Home/Home';
import Error from '../Error/Error';
import Gallery from '../Gallery/Gallery';
import Colors from '../Colors/Colors';

import { Switch, Route } from 'react-router-dom';

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      apikey: '18c3325e-bd93-4663-98ca-c165cdde5592',
      today: new Date(),
      isLoading: true,
      todaysColor: {},
      art: false,
      colors: {},
      error: null,
    }
  }

  componentDidMount() {
    let day = this.getDayOfYear()
    fetch(`https://api.harvardartmuseums.org/spectrum/${day}?apikey=${this.state.apikey}`)
    .then(response => response.json())
    .then(data => this.setState({
      todaysColor: data,
      isLoading: false
    }))
    .catch(err => console.error(err))
  }

  fetchArt = () => {
    fetch(`https://api.harvardartmuseums.org/object?color:${this.state.todaysColor}&hasImage=1&apikey=${this.state.apikey}`)
    .then(response => response.json())
    .then(data => this.setState({
      art: data,
    }))
    .catch(err => console.error(err))
  }

  fetchAllColors = () => {
    this.setState({ isLoading: true })
    fetch(`https://api.harvardartmuseums.org/color?size=147&apikey=${this.state.apikey}`)
      .then(response => response.json())
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
    console.log(this.state.todaysColor);
    console.log(this.state.art);
    if (this.state.isLoading) {
      return (<p className='loading'>Loading...</p>)
    } else if (this.state.error) {
      return <Error />
    } else {
      return (
        <Switch>
          <Route exact path='/'>
            <Home 
              todaysColor={this.state.todaysColor.color} 
              fetchArt={this.fetchArt}
              fetchAllColors={this.fetchAllColors}
            />
          </Route>
          <Route path='/gallery/:color'>
            <Gallery />
          </Route>
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
