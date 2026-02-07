import { useTranslation } from "react-i18next";
import { getWeatherInfo, formatTime, getDayDate } from "../data/weather";
import WeatherIcon from "./WeatherIcon";
import "../styles/weather.css";

// Map weather codes to translation keys
const WEATHER_LABEL_KEYS = {
  0: "sunny",
  1: "mainlyClear",
  2: "partlyCloudy",
  3: "overcast",
  45: "fog",
  48: "rimeFog",
  51: "lightDrizzle",
  53: "moderateDrizzle",
  55: "denseDrizzle",
  56: "freezingDrizzle",
  57: "freezingDrizzle",
  61: "slightRain",
  63: "moderateRain",
  65: "heavyRain",
  66: "freezingRain",
  67: "heavyRain",
  71: "slightSnow",
  73: "moderateSnow",
  75: "heavySnow",
  77: "snowGrains",
  80: "slightShowers",
  81: "moderateShowers",
  82: "violentShowers",
  85: "slightSnowShowers",
  86: "heavySnowShowers",
  95: "thunderstorm",
  96: "thunderstormHail",
  99: "thunderstormHeavyHail",
};

function WeatherPanel({ theme, currentDay, weatherData, isVisible, onClose, loading }) {
  const { t, i18n } = useTranslation();
  const dayWeather = weatherData?.[currentDay];
  const weatherInfo = dayWeather ? getWeatherInfo(dayWeather.weatherCode) : null;
  const dateStr = getDayDate(currentDay);

  // Get locale for date formatting
  const locale = i18n.language === "fi" ? "fi-FI" : "en-NZ";

  // Format date nicely with locale
  const formattedDate = dateStr
    ? new Date(dateStr).toLocaleDateString(locale, {
        weekday: "short",
        month: "short",
        day: "numeric",
      })
    : "";

  // Get translated weather label
  const getWeatherLabel = (code) => {
    const key = WEATHER_LABEL_KEYS[code];
    return key ? t(`weather.conditions.${key}`) : weatherInfo?.label || "";
  };

  return (
    <div
      className={`weather-panel${theme === "dark" ? " weather-panel--dark" : ""}${!isVisible ? " weather-panel--hidden" : ""}`}
    >
      <div className="weather-panel__header">
        <h3 className="weather-panel__title">{t("weather.title")}</h3>
        <button className="weather-panel__close" onClick={onClose} title={t("weather.close")}>
          &times;
        </button>
      </div>

      <div className="weather-panel__content">
        {loading ? (
          <div className="weather-panel__loading">{t("weather.loading")}</div>
        ) : !dayWeather ? (
          <div className="weather-panel__error">{t("weather.unavailable")}</div>
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
            <div className="weather-panel__condition">{getWeatherLabel(dayWeather.weatherCode)}</div>

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
