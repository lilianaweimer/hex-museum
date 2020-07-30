import React from 'react';
import './Gallery.css';

import { NavLink } from 'react-router-dom';

const Gallery = (props) => {
  if (props.art) {
    // props.art.records.forEach(piece => {
    //   if (!piece.baseimageurl) {
    //     props.getNewPiece(props.currentColor, piece.objectid)
    //   }
    // })
    return (
      <div style={{ backgroundColor: props.currentColor }}>
        <NavLink to='/' className='home-nav'>home</NavLink>
        <section className='gallery'>
          {props.art.records.map(piece => {
        return (
          <article className='art-icle' key={piece.objectid}>
            <img 
              className='art-img' 
              src={piece.primaryimageurl ? piece.primaryimageurl : require('./lostimg.jpg')} 
              alt={piece.title}
              // onError={() => this.src='./lostimg.jpg'}
            />
            <div className='gallery-didactic'>
              <p className='gallery-title'>{piece.title ? piece.title : 'no title'}</p>
              <p>{piece.people ? piece.people[0].displayname : 'unknown artist'}</p>
            </div>
          </article>
        )
    })}
      </section>
        <button className='home-nav'>More Art!</button>
      </div>
    )
  }
}

export default Gallery;





// const Art = (props) => {
//   return (props.art.records.map(piece => {
//     return (
//       <article className='art-icle' key={piece.id}>
//         <img src={`${piece.primaryimageurl}`} alt={piece.title}/>
//         {/* <h2>{piece.title ? piece.title : "No Title"}</h2>
//         {piece.people >= 1 ? piece.people.map(person => {
//           return (<p>{person.alphasort}: {person.role}</p>)
//         }) : "Unknown Artist"}
//         <p>{piece.dated ? piece.dated : "Unknown date"}</p>
//         <p>{piece.culture ? piece.culture : "Unknown culture"}</p>
//         <p>{piece.period ? piece.period : "Unknown period"}</p> */}
//       </article>
//     )
//   }))
// }