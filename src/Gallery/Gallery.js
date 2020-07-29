import React from 'react';

const Gallery = () => {
  return (<p>gallery</p>)
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