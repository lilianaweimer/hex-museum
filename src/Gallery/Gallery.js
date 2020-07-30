import React from 'react';
import './Gallery.css';

const Gallery = (props) => {
  if (props.art) {
    return (props.art.records.map(piece => {
        return (
          <img 
            className='art-img' 
            src={piece.primaryimageurl} 
            alt={piece.title}
            onError={(piece.images.length > 1 ? piece.images[1].baseimageurl : './lostimg.jpg')}
          />
        )
    }))
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