import React from 'react';
import './Home.css';

import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const Home = (props) => {
  if (props.todaysColor) {
    const styles = {backgroundColor: props.todaysColor.color}
    return (
      <div className="home" style={styles}>
        <section className='home-nav-section'>
          <h2>today's color: {props.todaysColor.color}</h2>  
          <Link 
            to={`/gallery/${props.todaysColor.id}`} 
            id={props.todaysColor}
            onClick={() => {
              props.fetchArt(props.todaysColor); 
              props.setCurrentColor(props.todaysColor.color)
            }} 
            className='home-nav'
            style={{...styles, height: '1.3em'}}>
              view today's gallery
          </Link>
          <br />
          <Link 
            to='/colors' 
            onClick={props.fetchAllColors} 
            className='home-nav'
            style={{...styles, height: '1.3em'}}>
              pick another color
            </Link>
          <br />
          <Link 
            to='/favorites' 
            className='home-nav'
            style={{...styles, height: '1.3em'}}>
              view my gallery
          </Link>
        </section>
      </div>
    )
  } else {
    return (<Redirect to='/error'/>)
  }
}

export default Home;

Home.propTypes = {
  todaysColor: PropTypes.object,
  fetchAllColors: PropTypes.func,
  fetchArt: PropTypes.func,
  setCurrentColor: PropTypes.func
};