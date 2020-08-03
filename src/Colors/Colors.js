import React from 'react';
import './Colors.css';
import Error from '../Error/Error';

import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Colors = (props) => {
  if (props.colors) {
    // console.log(props.colors);
    // console.log('yes');
    return (
      <div style={{ textAlign: 'center' }}>
        <Link to='/' className='home-nav'>home</Link>
        <section className='colors'>
          {props.colors.sort((a, b) => b.hex - a.hex).map(color => {
            return (
              <Link 
                to={`/gallery/${color.id}`}
                onClick={() => {props.fetchArt(color.id); props.setCurrentColor(color.hex)}} 
                className='color-nav' 
                key={color.id}
                id={color.hex}
                style={{backgroundColor: color.hex}}
                data-testid={props.colors.indexOf(color)}
              >
                <p className='color-info'>{color.name}</p>
                <p className='color-info'>{color.hex}</p>
              </Link>
            )
        })}
      </section>
      </div>
    )
  } else {
    return <Error />
  }
}

export default Colors;

Colors.propTypes = {
  colors: PropTypes.array,
  fetchArt: PropTypes.func,
  setCurrentColor: PropTypes.func
}