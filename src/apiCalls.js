const apikey = process.env.REACT_APP_API_KEY;

export const fetchTodaysColor = (day) => {
  return fetch(`https://api.harvardartmuseums.org/spectrum/${day}?apikey=${apikey}`)
    .then(response => response.json())
}

export const getAllColors = () => {
  return fetch(`https://api.harvardartmuseums.org/color?size=147&apikey=${apikey}`)
    .then(response => response.json())
}

export const getArt = (color) => {
  return fetch(`https://api.harvardartmuseums.org/object?color:${color}&apikey=${apikey}&hasImage=1&sort=random&q=imagepermissionlevel:0`)
    .then(response => response.json())
}