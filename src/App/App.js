import React from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      apikey: '18c3325e-bd93-4663-98ca-c165cdde5592',
      today: new Date(),
      isLoading: true,
      todaysColor: {},
      art: false,
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
      return (<p>Loading...</p>)
    } else {
      return (
        <div className="App" style={{backgroundColor: this.state.todaysColor.color}}>
          <button onClick={this.fetchArt}>{this.state.todaysColor.color}</button>
          {this.state.art ? <section className='art-section' style={{backgroundColor: this.state.todaysColor.color}}><Art art={this.state.art}/></section> : null}
        </div>
      );
    }
  }
  
}

export default App;
