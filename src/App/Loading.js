import React from 'react';

const Loading = () => {
  return (
    <p className='loading'>
          <img src={require('./movingblocksloading.gif')} alt='loading'/>
    </p>
  )
}

export default Loading;