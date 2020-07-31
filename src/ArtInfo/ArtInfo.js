import React from 'react';
import './ArtInfo.css';

import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';


const ArtInfo = (props) => {
  let info = props.info;
  return (
    <div style={{ backgroundColor: props.color }}>
      <section className='piece'>
      <NavLink to='/' className='home-btn'>home</NavLink>
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
        <button className='home-nav'>add to favorites</button>
      </article>
      {info.images ? info.images.map(image => {
        return <img
                  key={info.images.indexOf(image)} 
                  className='piece-img' 
                  src={image.baseimageurl} 
                  alt={`${info.title}`}
                />
      }) : null}
    </section>
    </section>
    </div>
  )
}

export default ArtInfo;

ArtInfo.propTypes = {
  art: PropTypes.object,
  color: PropTypes.string
}