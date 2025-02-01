import React, { useState, useEffect } from "react";
import "./Weather.css";

const Weather = () => {
  const [location, setLocation] = useState("New Delhi");
  const [searchInput, setSearchInput] = useState("");
  const [weatherData, setWeatherData] = useState({
    temp: 0,
    condition: "Clear",
    humidity: 0,
    windSpeed: 0,
  });
  const [error, setError] = useState(false);

  const getWeatherIcon = (condition) => {
    const weatherTypes = {
      Clear: { icon: "fa-sun", color: "#ffd700" },
      Clouds: { icon: "fa-cloud", color: "#a9a9a9" },
      Rain: { icon: "fa-cloud-rain", color: "#4682b4" },
      Drizzle: { icon: "fa-cloud-rain", color: "#87ceeb" },
      Thunderstorm: { icon: "fa-cloud-bolt", color: "#daa520" },
      Snow: { icon: "fa-snowflake", color: "#e0ffff" },
      Mist: { icon: "fa-smog", color: "#b8b8b8" },
      Smoke: { icon: "fa-smog", color: "#696969" },
      Haze: { icon: "fa-smog", color: "#d3d3d3" },
      Dust: { icon: "fa-smog", color: "#c4a484" },
      Fog: { icon: "fa-smog", color: "#778899" },
      Sand: { icon: "fa-smog", color: "#f4a460" },
      Ash: { icon: "fa-smog", color: "#a9a9a9" },
      Squall: { icon: "fa-wind", color: "#87ceeb" },
      Tornado: { icon: "fa-tornado", color: "#4a4a4a" },
    };
    return weatherTypes[condition] || { icon: "fa-sun", color: "#ffd700" };
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setLocation(searchInput);
    setSearchInput("");
    const searchinput = document.getElementById("weathersearch");
    searchinput.blur();
  };

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const API_KEY = "d7ff8abdba7d7eb6b122552ebd569208";
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${API_KEY}`
        );
        const data = await response.json();
        console.log(data);
        setError(false);
        setWeatherData({
          temp: Math.round(data.main.temp),
          condition: data.weather[0].main,
          humidity: data.main.humidity,
          windSpeed: Math.round(data.wind.speed * 3.6),
          cod: data.cod,
        });
      } catch (error) {
        console.error("Error fetching weather:", error);
        setError(true);
        setWeatherData({
          temp: 0,
          condition: "Clear",
          humidity: 0,
          windSpeed: 0,
          cod: 200,
        });
      }
    };

    fetchWeather();
  }, [location]);

  const weatherType = getWeatherIcon(weatherData.condition);

  return (
    <div className="weather">
      <div className="weather-header">
        {error ? (
          <h2 style={{ fontSize: "1.5rem" }}>Location Not Found</h2>
        ) : (
          <h2 className="location">
            <i className="fa-solid fa-location-dot"></i>
            {location}
          </h2>
        )}
      </div>

      <div className="weather-content">
        <form className="weather-search" onSubmit={handleSearch}>
          <input
            id="weathersearch"
            autoComplete="off"
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search location..."
            required
          />
          <button type="submit">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </form>
        <div className="temperature">
          <span className="temp-value">{weatherData.temp}°C</span>
          <div className="weather-condition">
            <i
              className={`fa-solid ${weatherType.icon}`}
              style={{ color: weatherType.color }}
            ></i>
            <span>{weatherData.condition}</span>
          </div>
        </div>

        <div className="weather-details">
          <div className="detail">
            <i className="fa-solid fa-droplet"></i>
            <div className="detail-info">
              <span className="value">{weatherData.humidity}%</span>
              <span className="label">Humidity</span>
            </div>
          </div>
          <div className="detail">
            <i className="fa-solid fa-wind"></i>
            <div className="detail-info">
              <span className="value">{weatherData.windSpeed} km/h</span>
              <span className="label">Wind Speed</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
