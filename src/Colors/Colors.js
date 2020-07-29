import React from 'react';
import { NavLink, Redirect } from 'react-router-dom';

const Colors = (props) => {
  
  if (props.colors) {
    return (
      <section className='colors'>
        <NavLink to='/' className='home-nav'>home</NavLink>
          {props.colors.map(color => {
            return (
              <NavLink 
                to={`/gallery/${color.hex}`} 
                className='color-nav' 
                key={color.id}
                style={{border: `3px solid ${color.hex}`}}
              >
                <p>{color.name}</p>
                <p>{color.hex}</p>
              </NavLink>
            )
        })}
      </section>
    )
  } else {
    return <Redirect to='/'/>
  }
}

export default Colors;