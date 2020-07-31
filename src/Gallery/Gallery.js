import React from 'react';
import './Gallery.css';

import { NavLink, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const Gallery = (props) => {
  if (props.art) {
    return (
      <div style={{ backgroundColor: props.currentColor, textAlign: "center" }}>
        <NavLink to='/' className='home-btn'>home</NavLink>
        <button className='home-btn' onClick={() => window.history.back()}>back</button>
        <section className='gallery'>
          {props.art.records.map(piece => {
        return (
            <article className='art-icle' key={piece.objectid}>
            <img 
              className='art-img' 
              src={piece.primaryimageurl ? piece.primaryimageurl : require('./lostimg.jpg')} 
              alt={piece.title}
            />
            <div className='gallery-didactic'>
              <p className='gallery-title gallery-info'>{piece.title ? piece.title : 'no title'}</p>
              <p className='gallery-info'>{piece.people ? piece.people[0].displayname : 'unknown artist'}</p>
              <button 
                className='home-nav' 
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
        <button className='home-btn'>more art!</button>
      </div>
    )
  } else {
    return <Redirect to='/error'/>
  }
}

export default Gallery;

Gallery.propTypes = {
  art: PropTypes.object,
  currentColor: PropTypes.string,
  getNewPiece: PropTypes.func,
  favorites: PropTypes.array,
  toggleFavorite: PropTypes.func,
}