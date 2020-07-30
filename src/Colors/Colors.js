import React from 'react';
import './Colors.css';

import { NavLink, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const Colors = (props) => {
  if (props.colors) {
    return (
      <div style={{ textAlign: "center" }}>
        <NavLink to='/' className='home-nav'>home</NavLink>
        <section className='colors'>
          {props.colors.sort((a, b) => b.hex - a.hex).map(color => {
            return (
              <NavLink 
                to={`/gallery/${color.id}`}
                onClick={() => {props.fetchArt(color.id); props.setCurrentColor(color.hex)}} 
                className='color-nav' 
                key={color.id}
                id={color.hex}
                style={{backgroundColor: color.hex}}
                data-testid='color-nav'
              >
                <p className='color-info'>{color.name}</p>
                <p className='color-info'>{color.hex}</p>
              </NavLink>
            )
        })}
      </section>
      </div>
    )
  } else {
    return <Redirect to='/'/>
  }
}

export default Colors;

Colors.propTypes = {
  colors: PropTypes.array,
  fetchArt: PropTypes.func,
  setCurrentColor: PropTypes.func
}