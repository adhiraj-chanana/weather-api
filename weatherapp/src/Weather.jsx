import React, { useState } from 'react';
import './weather.css';

const api = { 
  key: "57ce25f37f4f7d54e89e002cbab61cf1",
  base: "https://api.openweathermap.org/data/2.5/"
}

const datebuilder = (d) => {
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day}, ${date} ${month} ${year}`;
}

const Weather = () => {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(data => {
          console.log(data);
          setWeather(result);
          setQuery('');
        });
    }
  }

  return (
    <div className={`weather-app ${weather.main && weather.main.temp > 16 ? 'warm' : ''}`}>
      <main>
        <div className='instruction-box'>
          <h2>Welcome to the Weather App</h2>
          <p>To get started, simply type the name of a city in the search bar below and press <strong>Enter</strong>.</p>
          <p>The app will display the current temperature and weather conditions for the selected city.</p>
        </div>

        <div className='search-box'>
          <input 
            type='text'
            className='search-bar'
            placeholder='Search for a city...'
            onChange={e => setQuery(e.target.value)}
            onKeyPress={search}
          />
        </div>

        {(typeof weather.main != "undefined") ? (
          <div>
            <div className='location-box'>
              <div className='location'>{weather.name}, {weather.sys.country}</div>
              <div className='date'>{datebuilder(new Date())}</div>
            </div>
            <div className='weather-box'>
              <div className='temp'>{Math.round(weather.main.temp)}°C</div>
              <div className='weather'>{weather.weather[0].main}</div>
            </div>
          </div>
        ) : (
          <div className='no-data'>Search for a city to see the weather information.</div>
        )}
      </main>
    </div>
  );
}

export default Weather;
