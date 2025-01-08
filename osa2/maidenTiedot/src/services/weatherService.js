const api = {
    key: '8820d3aafc274ef54efa9aa650bcef8f',
    base: 'https://api.openweathermap.org/data/2.5/'
}

const searchWeather = (countryName) => {
    return fetch(`${api.base}weather?q=${countryName}&units=metric&APPID=${api.key}`)
      .then(res => res.json())
      .then((result) => {
        console.log(result)
        return result
      })
  }

export default {
    searchWeather
}