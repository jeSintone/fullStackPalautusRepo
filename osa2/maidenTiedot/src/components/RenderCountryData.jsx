

const RenderCountryData = ({countryData, weatherData}) => {
    if (countryData === null) {
        return null
    } else {
        console.log(countryData)
        return (
            <div>
                <h1>{countryData.name.common}</h1>
                <p>capital {countryData.capital}</p>
                <p>area {countryData.area}</p>
                <h3>Languages:</h3>
                <ul>
                    {Object.values(countryData.languages).map((language, index) => (
                        <li key={index}>{language}</li>
                        ))}
                </ul>
                <img src={countryData.flags.png} alt='image not found'/>
                {weatherData && (
                    <>
                    <h2>Weather in {countryData.capital}</h2>
                <p>temperature {weatherData.main.temp} Celcius</p>
                <img src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`} alt="Weather icon" />
                <p>wind {weatherData.wind.speed} m/s</p>
                    </>
                )}
            </div>
        )
    }

}

export default RenderCountryData