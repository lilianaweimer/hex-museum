import React from 'react';

import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Error = (props) => {
  return (
    <section className='error'>
      <p className='error'>{props.error ? props.error : 'something went wrong'}</p>
      <Link to='/' className='home-nav'>home</Link>
    </section>
  )
}

export default Error;

Error.propTypes = {
  error: PropTypes.string
}