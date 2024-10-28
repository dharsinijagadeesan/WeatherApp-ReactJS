import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { WiCloudy, WiDaySunny, WiRain, WiSnow, WiWindy } from 'react-icons/wi';
import '../components/Weather.css';

function Weather({ location }) {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`);
        setWeatherData(response.data);
        setError(null);
      } catch (err) {
        setError("Could not fetch weather data. Please check the location and try again.");
        setWeatherData(null);
      }
    };
    if (location) fetchWeather();
  }, [location]);

  const renderWeatherIcon = () => {
    if (!weatherData) return null;
    const mainWeather = weatherData.weather[0].main.toLowerCase();
    switch (mainWeather) {
      case 'clouds': return <WiCloudy className="weather-icon" />;
      case 'clear': return <WiDaySunny className="weather-icon" />;
      case 'rain': return <WiRain className="weather-icon" />;
      case 'snow': return <WiSnow className="weather-icon" />;
      default: return <WiWindy className="weather-icon" />;
    }
  };

  return (
    <div className="weather-card">
      {error && <p className="error">{error}</p>}
      {weatherData && (
        <div className="weather-info">
          {renderWeatherIcon()}
          <h2>{weatherData.name}</h2>
          <p>Temperature: {weatherData.main.temp}°C</p>
          <p>Weather: {weatherData.weather[0].description}</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
          <p>Wind Speed: {weatherData.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
}

export default Weather;
