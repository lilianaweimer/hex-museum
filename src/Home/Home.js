import React from 'react';
import './Home.css';

import { NavLink, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const Home = (props) => {
  // console.log(props.todaysColor)
  if (props.todaysColor) {
    const styles = {backgroundColor: props.todaysColor.color}
    return (
      <div className="home" style={styles}>
        <section className='home-nav-section'>
          <h2>today's color: {props.todaysColor.color}</h2>  
          <NavLink 
            to={`/gallery/${props.todaysColor.id}`} 
            id={props.todaysColor}
            onClick={() => {props.fetchArt(props.todaysColor); props.setCurrentColor(props.todaysColor.color)}} 
            className='home-nav'
            style={styles}>
              view today's gallery
          </NavLink>
          <br />
          <NavLink 
            to='/colors' 
            onClick={props.fetchAllColors} 
            className='home-nav'
            style={styles}>
              pick another color
            </NavLink>
          <br />
          <NavLink 
            to='/favorites' 
            className='home-nav'
            style={styles}>
              view my gallery
          </NavLink>
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