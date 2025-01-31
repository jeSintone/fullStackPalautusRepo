import api from "./api"

const API_BASE = api[1]
const API_KEY = api[0]

const searchWeather = (countryName) => {
  console.log(`${API_BASE}weather?q=${countryName}&units=metric&APPID=${API_KEY}`);  
  return fetch(`${API_BASE}weather?q=${countryName}&units=metric&APPID=${API_KEY}`)
      .then(res => res.json())
      .then((result) => {
        console.log(result)
        return result
      })
  }

export default {
    searchWeather
}