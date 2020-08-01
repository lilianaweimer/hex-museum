import React from 'react';
import PropTypes from 'prop-types';

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
  console.log(items);
  return (
    <article>
      <h3>{props.type === 'people' ? 'artist' : props.type}</h3>
    </article>
  );
}

export default Trend;

Trend.propTypes = {
  favorites: PropTypes.array,
  type: PropTypes.string
}