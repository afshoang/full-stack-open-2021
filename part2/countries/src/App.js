import React, { useState, useEffect } from 'react';
import Filter from './components/Filter';
import axios from 'axios';

function App() {
  const [countries, setCountries] = useState([]);
  const [weather, setWeather] = useState({});
  const [keyword, setKeyword] = useState('');
  const [country, setCountry] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      const { data } = await axios.get('https://restcountries.eu/rest/v2/all');
      setCountries(data);
    };

    if (country.length !== 0) {
      const fetchWeather = async () => {
        const api_key = process.env.REACT_APP_API_KEY;
        console.log(api_key);
        const { data } = await axios.get(
          `http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital}`
        );
        console.log(data);
        setWeather(data.current);
      };
      fetchWeather();
    }

    fetchCountries();
  }, [country.capital, country.length]);

  const handleChange = (e) => {
    setKeyword(e.target.value);
  };

  const handleChangeCountry = (country) => {
    // set country
    setCountry(country);
    // setKeyword('');
  };

  return (
    <>
      <div>
        <Filter
          countries={countries}
          keyword={keyword}
          handleChange={handleChange}
          handleChangeCountry={handleChangeCountry}
        />
      </div>

      {country.length !== 0 && (
        <>
          <h1>{country.name}</h1>

          <p>{country.capital}</p>
          <p>{country.population}</p>

          <h3>Languages</h3>
          <ul>
            {country.languages.map((language) => (
              <li key={language.name}>{language.name}</li>
            ))}
          </ul>
          <img src={country.flag} alt='Country flag' />

          <h3>Weather in {country.capital}</h3>
          <p>temperature: {weather.temperature}</p>
          {weather.weather_icons && (
            <img src={weather.weather_icons[0]} alt='weather icon' />
          )}
          <p>wind: {weather.wind_degree}</p>
        </>
      )}
    </>
  );
}

export default App;
