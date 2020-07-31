import apikey from './apikey';
import allColors from './MockAPIData/allColors.json';
import colorGallery from './MockAPIData/colorGallery.json';
import todaysColor from './MockAPIData/todaysColor.json';
import replacement from './MockAPIData/replacementPiece.json';

export const fetchTodaysColor = (day, apikey) => {
  //temporary mock to avoid going over limit 
  return Promise.resolve(todaysColor)
  // return fetch(`https://api.harvardartmuseums.org/spectrum/${day}?apikey=${apikey}`)
  //   .then(response => response.json())
}

export const getAllColors = () => {
  //temporary mock to avoid going over limit 
  return Promise.resolve(allColors)
  // return fetch(`https://api.harvardartmuseums.org/color?size=147&apikey=${apikey}`)
  //   .then(response => response.json())
}

export const getArt = (color, apikey) => {
  //temporary mock to avoid going over limit
   return Promise.resolve(colorGallery)
  // return fetch(`https://api.harvardartmuseums.org/object?color:${color}&apikey=${apikey}&hasImage=1&sort=random&q=imagepermissionlevel:0`)
  //   .then(response => response.json())
}

export const getReplacement = (color, apikey) => {
  return Promise.resolve(replacement);
  // return fetch(`https://api.harvardartmuseums.org/object?q=imagepermissionlevel:0&color:${color}&hasImage=1&apikey=${apikey}&size=1`)
  //   .then(response => response.json())
}