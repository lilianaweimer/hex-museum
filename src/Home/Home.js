import React from 'react';
import './Home.css';

import { NavLink } from 'react-router-dom';

const Home = (props) => {
  const styles = {backgroundColor: props.todaysColor}

  return (
    <div className="home" style={styles}>
      <h2 style={styles}>today's color: {props.todaysColor}</h2>  
      <NavLink to={`/gallery/${props.todaysColor}`} id={props.todaysColor} onClick={props.fetchArt}>view today's gallery</NavLink>
      <NavLink to='/colors' onClick={props.fetchAllColors}>pick another color</NavLink>
    </div>
  )
}

export default Home;