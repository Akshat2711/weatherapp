import React, { useState, useEffect } from 'react';
import { WiHumidity, WiWindy, WiSunrise, WiSunset, WiThermometer } from 'react-icons/wi'; // Weather icons

const Main = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState("chennai");
  const [inputValue, setInputValue] = useState('');
  const[alllocation,setalllocation]=useState([]);

  const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      setLocation(inputValue);
      setInputValue('');
      setalllocation([...alllocation,inputValue]);
      localStorage.setItem("allloc",alllocation);
  
    }
  };

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=5`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch weather data');
        }
        const data = await response.json();
        setWeatherData(data);
      } catch (err) {
        console.error('Error fetching weather data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [location]);

  if (loading) {
    return <p className='loading'>Loading...</p>;
  }

  if (error) {
    return <p className='error'>Error: {error}</p>;
  }

  if (!weatherData || !weatherData.forecast) {
    return <p>No forecast data available.</p>;
  }

  const currentDay = weatherData.forecast.forecastday[0];

  return (
    <div>
      <h2>⚲ {weatherData.location.name}</h2>

      <center>
        <input
          type='text'
          placeholder='Enter Location'
          value={inputValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
          <div>
            <ul>
            {alllocation.map((value, index) => (
              <li key={index} style={{ color: "white"}}>
                {value}
              </li>
            ))}
            </ul>
          </div> 
      </center>

      {/* Display current day weather information */}
      <div className='current_day'>
        <h3>Today's Weather: </h3>

        {/* Current Temperature */}
        <div className='temperature'>
          <WiThermometer className='icon' /> {currentDay.day.avgtemp_c}°C
        </div>

        {/* Other Weather Details */}
        <p><WiHumidity className='icon' /> Humidity: {currentDay.day.avghumidity}%</p>
        <p><WiWindy className='icon' /> Wind Speed: {currentDay.day.maxwind_kph} kph</p>
        <p><WiSunrise className='icon' /> Sunrise: {currentDay.astro.sunrise}</p>
        <p><WiSunset className='icon' /> Sunset: {currentDay.astro.sunset}</p>
      </div>

      {/* Display 5-day forecast */}
      <div className='parent_div'>
        {weatherData.forecast.forecastday.map((day, index) => (
          <div key={index} className='weather_info'>
            <h3>{new Date(day.date).toDateString()}</h3>
            <p>Temperature: {day.day.avgtemp_c}°C</p>
            <p>Condition: {day.day.condition.text}</p>
            <p>Humidity: {day.day.avghumidity}%</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Main;
