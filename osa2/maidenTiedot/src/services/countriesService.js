import axios from 'axios'
const urlAllCountries = 'https://studies.cs.helsinki.fi/restcountries/api/all'
const specificCountry = 'https://studies.cs.helsinki.fi/restcountries/api/name/'

const getAllCountries = () => {
    const request = axios.get(urlAllCountries)
    return request.then(response => response.data)
}

const getCountryData = (countryName) => {
    const request = axios.get(specificCountry + countryName)
    return request.then(response => response.data)
}

export default {
    getAllCountries,
    getCountryData
}