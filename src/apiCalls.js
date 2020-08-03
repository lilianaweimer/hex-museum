import apikey from './apikey';
import allColors from './MockAPIData/allColors.json';
import colorGallery from './MockAPIData/colorGallery.json';
import todaysColor from './MockAPIData/todaysColor.json';

export const fetchTodaysColor = (day) => {
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

export const getArt = (color) => {
  //temporary mock to avoid going over limit
   return Promise.resolve(colorGallery)
  // return fetch(`https://api.harvardartmuseums.org/object?color:${color}&apikey=${apikey}&hasImage=1&sort=random&q=imagepermissionlevel:0`)
  //   .then(response => response.json())
}