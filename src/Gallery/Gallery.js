import React from 'react';
import './Gallery.css';
import Loading from '../App/Loading';

import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const Gallery = (props) => {
  if (props.isLoading) {
    return <Loading />
  } else if (props.art && !props.isLoading) {
    const art = props.art.records.map(piece => {
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
              data-testid={`fave${props.art.records.indexOf(piece)}`} 
              onClick={() => props.toggleFavorite(piece, props.favorites.includes(piece))}>
                {props.favorites.includes(piece) ? 'unfavorite' : 'favorite'}
            </button>
            <Link to={`/piece/${piece.objectid}`}>
              <button className='home-nav' data-testid={props.art.records.indexOf(piece)}>about</button>
            </Link>
          </div>
        </article>
      )
  })
    return (
      <div style={{ backgroundColor: props.currentColor, textAlign: "center" }}>
        <Link to='/' className='home-btn'>home</Link>
        <button className='home-btn' onClick={() => window.history.back()}>back</button>
        <h1 className='gallery-welcome'>welcome to the {props.currentColor} gallery</h1>
        <section className='gallery'>
        {art}
      </section>
        <button className='home-btn' onClick={() => props.getMoreArt(window.location.pathname)}>more art!</button>
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
  isLoading: PropTypes.bool,
  getMoreArt: PropTypes.func,
}