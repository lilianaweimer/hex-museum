import React from 'react';
import './Trend.css';
import PropTypes from 'prop-types';

import ColorTrend from './ColorTrend';

const Trend = (props) => {
  let items = [];
  if (props.type === 'color') {
    props.favorites.forEach(piece => {
      if (piece.colorcount >= 1) {
        piece.colors.forEach(color => {
          items.push(color.color)
        })
      }
    })
  } else if (props.type === 'people') {
    props.favorites.forEach(piece => {
      if (piece.peoplecount >= 1) {
        piece.people.forEach(person => {
          items.push(person.displayname)
        })
      }
    })
  } else {
    props.favorites.forEach(piece => {
      if (piece[props.type]) {
        items.push(piece[props.type])
      }
    });
  }
  let itemsFreq = items.reduce((freq, item) => {
    if (!freq[item]) {
      freq[item] = 1
    } else {
      freq[item]++
    }
    return freq;
  }, {})
  let sorted = Object.entries(itemsFreq).sort((a, b) => b[1] - a[1]);

  if (sorted.length) {
    if (props.type === 'color') {
      return <ColorTrend sorted={sorted} />
    } else {
      return (
        <article className='trend'>
          <h3>{props.type === 'people' ? 'artist' : props.type}</h3>
          <ol className='trend-list'>
            {sorted[0] ? <li>{sorted[0][0]}</li> : null}
            {sorted[1] ? <li>{sorted[1][0]}</li> : null}
            {sorted[2] ? <li>{sorted[2][0]}</li> : null}
            {sorted[3] ? <li>{sorted[3][0]}</li> : null}
            {sorted[4] ? <li>{sorted[4][0]}</li> : null}
          </ol>
        </article>
      );
    }
  } else {
    return null;
  }
}

export default Trend;

Trend.propTypes = {
  favorites: PropTypes.array,
  type: PropTypes.string
}