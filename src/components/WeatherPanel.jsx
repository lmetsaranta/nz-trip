import { getWeatherInfo, formatTime, getDayDate } from "../data/weather";
import WeatherIcon from "./WeatherIcon";
import "../styles/weather.css";

function WeatherPanel({ theme, currentDay, weatherData, isVisible, onClose, loading }) {
  const dayWeather = weatherData?.[currentDay];
  const weatherInfo = dayWeather ? getWeatherInfo(dayWeather.weatherCode) : null;
  const dateStr = getDayDate(currentDay);

  // Format date nicely
  const formattedDate = dateStr
    ? new Date(dateStr).toLocaleDateString("en-NZ", {
        weekday: "short",
        month: "short",
        day: "numeric",
      })
    : "";

  return (
    <div
      className={`weather-panel${theme === "dark" ? " weather-panel--dark" : ""}${!isVisible ? " weather-panel--hidden" : ""}`}
    >
      <div className="weather-panel__header">
        <h3 className="weather-panel__title">Weather</h3>
        <button className="weather-panel__close" onClick={onClose} title="Close">
          &times;
        </button>
      </div>

      <div className="weather-panel__content">
        {loading ? (
          <div className="weather-panel__loading">Loading weather...</div>
        ) : !dayWeather ? (
          <div className="weather-panel__error">Weather data unavailable</div>
        ) : (
          <>
            {/* Date */}
            <div className="weather-panel__date">{formattedDate}</div>

            {/* Main weather display */}
            <div className="weather-panel__main">
              <div className="weather-panel__icon-wrap">
                <WeatherIcon name={weatherInfo.icon} size="large" />
              </div>
              <div className="weather-panel__temp">
                <span className="weather-panel__temp-high">
                  {Math.round(dayWeather.tempMax)}°
                </span>
                <span className="weather-panel__temp-low">
                  {Math.round(dayWeather.tempMin)}°
                </span>
              </div>
            </div>

            {/* Condition label */}
            <div className="weather-panel__condition">{weatherInfo.label}</div>

            {/* Details grid */}
            <div className="weather-panel__details">
              {/* Precipitation */}
              {dayWeather.precipitation > 0 && (
                <div className="weather-panel__detail">
                  <WeatherIcon name="droplet" size="small" />
                  <span className="weather-panel__detail-value">
                    {dayWeather.precipitation.toFixed(1)} mm
                  </span>
                </div>
              )}

              {/* Precipitation probability */}
              {dayWeather.precipitationProbability != null && (
                <div className="weather-panel__detail">
                  <WeatherIcon name="cloud-rain" size="small" />
                  <span className="weather-panel__detail-value">
                    {dayWeather.precipitationProbability}%
                  </span>
                </div>
              )}

              {/* Wind */}
              {dayWeather.windSpeed != null && (
                <div className="weather-panel__detail">
                  <WeatherIcon name="wind" size="small" />
                  <span className="weather-panel__detail-value">
                    {Math.round(dayWeather.windSpeed)} km/h
                  </span>
                </div>
              )}

              {/* UV Index */}
              {dayWeather.uvIndex != null && (
                <div className="weather-panel__detail">
                  <WeatherIcon name="sun" size="small" />
                  <span className="weather-panel__detail-value">
                    UV {Math.round(dayWeather.uvIndex)}
                  </span>
                </div>
              )}
            </div>

            {/* Sunrise/Sunset */}
            <div className="weather-panel__sun">
              <div className="weather-panel__sun-item">
                <WeatherIcon name="sunrise" size="small" />
                <span>{formatTime(dayWeather.sunrise)}</span>
              </div>
              <div className="weather-panel__sun-item">
                <WeatherIcon name="sunset" size="small" />
                <span>{formatTime(dayWeather.sunset)}</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default WeatherPanel;
