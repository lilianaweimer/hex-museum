export const fetchTodaysColor = (day, apikey) => {
  return fetch(`https://api.harvardartmuseums.org/spectrum/${day}?apikey=${apikey}`)
    .then(response => response.json())
}

export const getAllColors = (apikey) => {
  return fetch(`https://api.harvardartmuseums.org/color?size=147&apikey=${apikey}`)
  .then(response => response.json())
}

export const getArt = (color, apikey) => {
  return fetch(`https://api.harvardartmuseums.org/object?color:${color}&hasImage=1&apikey=${apikey}`)
    .then(response => response.json())
}