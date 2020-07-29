import React from 'react';

const Home = (props) => {
  return (
    <div className="home" style={{backgroundColor: props.todaysColor}}>
          <button onClick={props.fetchArt}>{props.todaysColor}</button>
          {/* {this.state.art ? <section className='art-section' style={{backgroundColor: this.state.todaysColor.color}}><Art art={this.state.art}/></section> : null} */}
    </div>
  )
}

export default Home;