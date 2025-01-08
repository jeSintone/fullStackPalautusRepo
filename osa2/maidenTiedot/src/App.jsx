import {useState, useEffect} from 'react'
import Filter from './components/Filter'
import countriesService from './services/countriesService'
import ShownCountries from './components/ShownCountries'
import RenderCountryData from './components/RenderCountryData'
import weatherService from './services/weatherService'

const App = () => {
  const [filterValue, setFilterValue] = useState('')
  const [countriesData, setCountriesData] = useState([])
  const [countryData, setCountryData] = useState(null)
  const [filteredCountryNames, setFilteredCountryNames] = useState([])
  const [weatherData, setWeatherData] = useState(null)

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilterValue(event.target.value)
  }
  useEffect(() => {
    countriesService
    .getAllCountries()
    .then(countries => {
      setCountriesData(countries)
    })
  }, [])

  const countryNames = (countriesData) => {
    return countriesData.map(country => country.name.common)
}

useEffect(() => {
  const filteredCountryNames = countriesData
  .map(country => country.name.common)
  .filter(country => country.toLowerCase().includes(filterValue.toLowerCase())
  )
  setFilteredCountryNames(filteredCountryNames)
}, [filterValue, countriesData])



useEffect(() => {
  if (filteredCountryNames.length === 1) {
    countriesService
      .getCountryData(filteredCountryNames[0])
      .then(data => {
        setCountryData(data)
    weatherService
      .searchWeather(filteredCountryNames[0])
      .then(data => {
        setWeatherData(data)
        console.log(weatherData)
      })
    });
  } else {
    setCountryData(null)
    setWeatherData(null)
  }
}, [filteredCountryNames])

const handleShowCountry = (countryName) => {
  setFilteredCountryNames([countryName])
}


return (
    <div>
      Find countries
      <Filter filterValue = {filterValue} handleFilterChange={handleFilterChange}/>
      <ShownCountries countryNames = {filteredCountryNames} onShowCountry={handleShowCountry}/>
      <RenderCountryData countryData={countryData} weatherData={weatherData}/>
    </div>
  )
}

export default App