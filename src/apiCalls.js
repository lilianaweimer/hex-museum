export const fetchTodaysColor = (day, apiKey) => {
  return fetch(`https://api.harvardartmuseums.org/spectrum/${day}?apikey=${apiKey}`)
    .then(response => response.json())
}