import React from 'react';
import PropTypes from 'prop-types';

const ColorTrend = (props) => {
  if (props.sorted) {
    return (
      <article className='trend'>
        <h3>color</h3>
        <ol className='trend-list'>
          {/* these li elements use unicode empty spaces to render the colors by themselves */}
          {props.sorted[0] ? 
            <li>
              <span className='empty-color-space' 
                style={{ backgroundColor: props.sorted[0][0] }}>‎‎　　　　</span>
              {` (${props.sorted[0][0]})`}
            </li> : null}
          {props.sorted[1] ? 
            <li>
              <span className='empty-color-space' 
                style={{ backgroundColor: props.sorted[1][0] }}>‎‎　　　　</span>
              {` (${props.sorted[1][0]})`}
            </li> : null}
          {props.sorted[2] ? 
            <li>
              <span className='empty-color-space' 
                style={{ backgroundColor: props.sorted[2][0] }}>‎‎　　　　</span>
              {` (${props.sorted[2][0]})`}
            </li> : null}
          {props.sorted[3] ? 
            <li>
              <span className='empty-color-space' 
                style={{ backgroundColor: props.sorted[3][0] }}>‎‎　　　　</span>
              {` (${props.sorted[3][0]})`}
            </li> : null}
          {props.sorted[4] ? 
            <li>
              <span className='empty-color-space' 
                style={{ backgroundColor: props.sorted[4][0] }}>‎‎　　　　</span>
              {` (${props.sorted[4][0]})`}
            </li> : null}
        </ol>
      </article>
    )
  } else {
    return null;
  }
  
}

export default ColorTrend;

ColorTrend.propTypes = {
  sorted: PropTypes.array
}