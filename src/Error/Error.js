import React from 'react';

import { NavLink } from 'react-router-dom';

const Error = (props) => {
  return (
    <section className='error'>
      <p className='error'>{props ? props.error : 'something went wrong'}</p>
      <NavLink to='/' className='home-nav'>home</NavLink>
    </section>
  )
}

export default Error;