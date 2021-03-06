import React from 'react';
import Error from '../Error/Error';
import './ArtInfo.css';

import PropTypes from 'prop-types';

const ArtInfo = (props) => {
  if (props.info) {
    let info = props.info;
    let isFavorite = props.favorites.find(favorite => favorite.objectid === info.objectid) ? true : false;
    return (
      <div style={{ backgroundColor: props.color }}>
        <section className='piece'>
        <button className='home-btn' onClick={() => window.history.back()}>back</button>
        <section>
        <h1 className='info-didactic'>{info.title}</h1>
        {info.primaryimageurl ? 
          <img 
            src={info.primaryimageurl} 
            alt={info.title}
            className='piece-imglarge' 
          /> 
          : null}
        <article className='info-didactic'>
          {info.people ? info.people.map(person => {
              return <h3 key={info.people.indexOf(person)}>{`${person.role}: ${person.displayname}`}</h3>
            }) : <h3>unknown artist</h3>}
          <p>{info.culture}</p>
          <p>{info.century}</p>
          <p>{info.period}</p>
          <p>{info.medium}</p>
          <p>{info.technique}</p>
          <p>{info.description}</p>
          <button 
            className='home-nav'
            data-testid='fave-btn' 
            onClick={() => props.toggleFavorite(info, isFavorite)}>
              {isFavorite ? 'remove from favorites' : 'add to favorites'}
          </button>
        </article>
        <div className='extra-images'>
          {info.images ? info.images.map(image => {
            return <img
                      key={info.images.indexOf(image)} 
                      className='piece-img' 
                      src={image.baseimageurl} 
                      alt={`${info.title}`}
                    />
          }) : null}
        </div>
      </section>
      <a className='link-to-ham' 
        href={info.url} 
        target='_blank' 
        rel="noopener noreferrer">
          view at harvard art museum
      </a>
      </section>
      </div>
    )
  } else {
    return <Error />
  }
}

export default ArtInfo;

ArtInfo.propTypes = {
  info: PropTypes.object,
  color: PropTypes.string,
  favorites: PropTypes.array,
  toggleFavorites: PropTypes.func,
}