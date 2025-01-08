
const ShownCountries = ({countryNames, onShowCountry}) => {

    if (countryNames.length > 10) {
        return (
            <div>
                Too many matches, specify another filter
            </div>
        )
    } else if (countryNames.length === 1) {
        return null
    }
    else {
        return (
            <ul>
                {countryNames.map(countryName => (
                <li key={countryName}>
                    {countryName} 
                    <button onClick={() => onShowCountry(countryName)}>show</button></li>
                
                ))}
            </ul>
        )
    }
}
export default ShownCountries