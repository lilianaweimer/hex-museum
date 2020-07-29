import React from 'react';
import './Colors.css'
import { NavLink, Redirect } from 'react-router-dom';

const Colors = (props) => {
  console.log(props)
  if (props.colors) {
    return (
      <>
        <NavLink to='/' className='home-nav'>home</NavLink>
        <section className='colors'>
          {props.colors.sort((a, b) => b.hex - a.hex).map(color => {
            return (
              <NavLink 
                to={`/gallery/${color.hex}`} 
                className='color-nav' 
                key={color.id}
                style={{backgroundColor: color.hex}}
              >
                <p className='color-info'>{color.name}</p>
                <p className='color-info'>{color.hex}</p>
              </NavLink>
            )
        })}
      </section>
      </>
    )
  } else {
    return <Redirect to='/'/>
  }
}

export default Colors;