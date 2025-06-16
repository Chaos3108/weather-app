import axios from "axios";
import React from "react";
import "./Weather.css";

export default function SearchContainer() {
  const [search, setSearch] = React.useState("");
  const [weatherData, setWeatherData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const searchWeather = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.weatherapi.com/v1/current.json?key=da07c76d5031452ea49115615251606&q=${search}`
      );
      setWeatherData(response.data);
      console.log(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      alert("Failed to fetch weather data");
      console.error("Error fetching weather data:", error);
    }
  };
  return (
    <div>
      <div className="search-container">
        <input
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          placeholder="Enter city name"
        />
        <button onClick={searchWeather} className="search-button">
          Search
        </button>
      </div>
      {loading && <p>Loading data...</p>}
      {console.log(weatherData.length)}
      {weatherData && weatherData.current && (
        <div className="weather-cards">
          <div className="weather-card">
            <h3>Temperature</h3>
            <p>{weatherData.current.temp_c}°C</p>
          </div>
          <div className="weather-card">
            <h3>Humidity</h3>
            <p>{weatherData.current.humidity}%</p>
          </div>
          <div className="weather-card">
            <h3>Condition</h3>
            <p>{weatherData.current.condition.text}</p>
          </div>
          <div className="weather-card">
            <h3>Wind Speed</h3>
            <p>{weatherData.current.wind_kph} kph</p>
          </div>
        </div>
      )}
    </div>
  );
}
