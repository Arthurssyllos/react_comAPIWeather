import React, { useState } from 'react';
import axios from 'axios';

import './App.css';

function App() {
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const apiKey = '94570cb4c921d4e43f648250217e0c07';

  // Função para buscar o clima com base na localidade
  const getWeather = async () => {
    setIsLoading(true);
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;
    try {
      const response = await axios.get(url);
      setWeather(response.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
    setIsLoading(false);
  };

  return (
    <div className="App">
      <div className="container">
        <h1>Weather App</h1>
        <div className="weather-info">
          <input
            type="text"
            placeholder="Enter location..."
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <button onClick={getWeather} disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Get Weather'}
          </button>
          {weather && (
            <div>
              <h2>Weather in {weather.name}</h2>
              <p>Temperature: {weather.main.temp}°C</p>
              <p>Weather: {weather.weather[0].main}</p>
              <p>Description: {weather.weather[0].description}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
