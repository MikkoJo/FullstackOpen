import { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({ weather, capital }) => {
  const arrowStyle = {
    display: 'inline-block',
    transform: `rotate(${weather.wind.deg}deg)`,
  }

  return (
    <div>
      <h3>Weather in {capital}</h3>
      <p>Temperature: {weather.main.temp} Celsius</p>
      <img
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
      />
      <p>Wind: {weather.wind.speed} m/s</p>
      <p>
        Wind direction: <span style={arrowStyle}>&#8593;</span>
      </p>
    </div>
  )
}

const Country = ({ country }) => {
  const apiKey = process.env.REACT_APP_OPENWEATHERMAP_API_KEY
  const [lat, lon] = country.capitalInfo.latlng
  const [weather, setWeather] = useState({})

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
      )
      .then((response) => setWeather(response.data))
  }, [apiKey, lat, lon])

  return (
    <div>
      <h2>{country.name.common}</h2>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        <li>Capital: {country.capital}</li>
        <li>Area: {country.area} km&sup2;</li>
      </ul>
      <h4>Languages:</h4>
      {/* {console.log(Object.entries(country.languages))}
    {Object.entries(country.languages).forEach(([key, value]) =>
      console.log(`${key}: ${value}`)
    )} */}
      <ul>
        {Object.entries(country.languages).map(([key, lang]) => (
          <Language key={key} lang={lang} />
        ))}
      </ul>
      <Flag source={country.flags.svg} />
      {Object.keys(weather).length > 0 && (
        <Weather weather={weather} capital={country.capital} />
      )}
    </div>
  )
}

const Language = ({ lang }) => <li>{lang}</li>

const Flag = ({ source }) => {
  const flagStyle = { height: 200, border: 'solid black', padding: 4 }
  return <img src={source} alt='flag' style={flagStyle} />
}

const CountryName = ({ country, setfilterCountry }) => {
  const handleClick = () => setfilterCountry(country.name.common)

  return (
    <p>
      {country.name.common}
      <button value={country.ccn3} onClick={handleClick}>
        show
      </button>
    </p>
  )
}

const Countries = ({ countries, setfilterCountry }) => {
  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>
  } else if (countries.length === 1) {
    return <Country country={countries[0]} />
  }
  return (
    <div>
      {countries.map((country) => (
        <CountryName
          key={country.ccn3}
          country={country}
          setfilterCountry={setfilterCountry}
        />
      ))}
    </div>
  )
}

const Filter = ({ filterCountry, handleFilterChange }) => (
  <div>
    <p>
      <label htmlFor='country'>Find countries</label>
      <input
        type='search'
        name='country'
        value={filterCountry}
        onChange={handleFilterChange}
      />
    </p>
  </div>
)

const App = () => {
  const [countries, setCountries] = useState([])

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then((response) => setCountries(response.data))
  }, [])

  const [filterCountry, setfilterCountry] = useState('')

  const handleFilterChange = (event) => {
    // console.log(event.target.value)
    setfilterCountry(event.target.value)
  }

  const countriesToShow = () => {
    if (filterCountry === '') {
      return []
    } else {
      return countries.filter((country) =>
        country.name.common
          .toLocaleLowerCase()
          .includes(filterCountry.toLocaleLowerCase())
      )
    }
  }

  return (
    <div>
      <h1>Country Information</h1>
      <Filter
        filterCountry={filterCountry}
        handleFilterChange={handleFilterChange}
      />
      <Countries
        countries={countriesToShow()}
        setfilterCountry={setfilterCountry}
      />
    </div>
  )
}

export default App
/*
https://api.meteomatics.com/2022-06-13T15:15:00.000+03:00/t_2m:C,wind_speed_w_50hPa:ms,wind_dir_10m:d,weather_symbol_1h:idx/60.1674881,24.9427473/json?model=mix
*/
