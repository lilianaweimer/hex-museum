import React from 'react';
import './Favorites.css';
import Trend from '../Trend/Trend';

import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

const Favorites = (props) => {
  if (props.favorites.length) {
    return (
      <div style={{ textAlign: "center", height: '100vh' }}>
        <NavLink to='/' className='home-btn'>home</NavLink>
        <button className='home-btn' onClick={() => window.history.back()}>back</button>
        <h1>your favorites and trends</h1>
        <section className='trends'>
          <Trend favorites={props.favorites} type='people'/>
          <Trend favorites={props.favorites} type='technique'/>
          <Trend favorites={props.favorites} type='century'/>
          <Trend favorites={props.favorites} type='culture'/>
          <Trend favorites={props.favorites} type='color'/>
        </section>
        <section className='gallery faves'>
          {props.favorites.map(piece => {
        return (
            <article className='art-icle' key={piece.objectid}>
            <img 
              className='art-img' 
              src={piece.primaryimageurl ? piece.primaryimageurl : require('../Gallery/lostimg.jpg')} 
              alt={piece.title}
            />
            <div className='gallery-didactic'>
              <p className='gallery-title gallery-info'>{piece.title ? piece.title : 'no title'}</p>
              <p className='gallery-info'>{piece.people ? piece.people[0].displayname : 'unknown artist'}</p>
              <button 
                className='home-nav'
                data-testid={props.favorites.indexOf(piece)} 
                onClick={() => props.toggleFavorite(piece, props.favorites.includes(piece))}>
                  {props.favorites.includes(piece) ? 'unfavorite' : 'favorite'}
              </button>
              <NavLink to={`/piece/${piece.objectid}`}>
                <button className='home-nav' data-testid={piece.objectid}>about</button>
              </NavLink>
            </div>
          </article>
        )
    })}
      </section>
      </div>
    )
  } else {
    return (
      <section 
        className='no-faves' 
        style={{ backgroundColor: props.color, textAlign: "center" }}
      >
        <h1>no favorites yet!</h1>
        <NavLink to='/' className='home-btn'>home</NavLink>
      </section>
    )
  }
}

export default Favorites;

Favorites.propTypes = {
  favorites: PropTypes.array,
  toggleFavorite: PropTypes.func,
  color: PropTypes.string,
}