import { useState, useEffect, useCallback } from "react";
import { stops } from "../data/trip";
import {
  getDayDate,
  WEATHER_CACHE_KEY,
  WEATHER_CACHE_VERSION,
} from "../data/weather";

// Get primary stop for each day (first stop of the day)
function getPrimaryStopForDay(day) {
  const dayStops = stops.filter((s) => s.day === day);
  return dayStops[0] || null;
}

// Build location list - one entry per day for accurate local weather
function buildLocationList() {
  const locations = [];

  for (let day = 1; day <= 27; day++) {
    const stop = getPrimaryStopForDay(day);
    if (!stop) continue;

    locations.push({
      day,
      coords: stop.coords,
    });
  }

  return locations;
}

// Fetch weather for a specific day and location
async function fetchWeatherForDay(location) {
  const [lat, lng] = location.coords;
  const date = getDayDate(location.day);

  const params = new URLSearchParams({
    latitude: lat.toString(),
    longitude: lng.toString(),
    start_date: date,
    end_date: date,
    daily: [
      "temperature_2m_max",
      "temperature_2m_min",
      "precipitation_sum",
      "precipitation_probability_max",
      "weathercode",
      "windspeed_10m_max",
      "uv_index_max",
      "sunrise",
      "sunset",
    ].join(","),
    timezone: "Pacific/Auckland",
  });

  const response = await fetch(
    `https://archive-api.open-meteo.com/v1/archive?${params}`
  );

  if (!response.ok) {
    throw new Error(`Weather API error: ${response.status}`);
  }

  return response.json();
}

// Parse API response for a single day
function parseWeatherResponse(data, day) {
  const daily = data.daily;

  if (!daily || !daily.time || !daily.time[0]) return null;

  return {
    date: daily.time[0],
    tempMax: daily.temperature_2m_max?.[0],
    tempMin: daily.temperature_2m_min?.[0],
    precipitation: daily.precipitation_sum?.[0],
    precipitationProbability: daily.precipitation_probability_max?.[0],
    weatherCode: daily.weathercode?.[0],
    windSpeed: daily.windspeed_10m_max?.[0],
    uvIndex: daily.uv_index_max?.[0],
    sunrise: daily.sunrise?.[0],
    sunset: daily.sunset?.[0],
  };
}

// Load from cache
function loadFromCache() {
  try {
    const cached = localStorage.getItem(WEATHER_CACHE_KEY);
    if (!cached) return null;

    const { version, data, timestamp } = JSON.parse(cached);

    // Check version match
    if (version !== WEATHER_CACHE_VERSION) return null;

    // Cache valid for 24 hours
    const maxAge = 24 * 60 * 60 * 1000;
    if (Date.now() - timestamp > maxAge) return null;

    return data;
  } catch {
    return null;
  }
}

// Save to cache
function saveToCache(data) {
  try {
    localStorage.setItem(
      WEATHER_CACHE_KEY,
      JSON.stringify({
        version: WEATHER_CACHE_VERSION,
        data,
        timestamp: Date.now(),
      })
    );
  } catch {
    // Ignore storage errors
  }
}

export function useWeatherData() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAllWeather = useCallback(async () => {
    // Try cache first
    const cached = loadFromCache();
    if (cached) {
      setWeatherData(cached);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const locations = buildLocationList();
      const allData = {};

      // Fetch weather for each day's specific location
      for (const location of locations) {
        const response = await fetchWeatherForDay(location);
        const parsed = parseWeatherResponse(response, location.day);
        if (parsed) {
          allData[location.day] = parsed;
        }

        // Small delay between requests to avoid rate limiting
        await new Promise((resolve) => setTimeout(resolve, 50));
      }

      saveToCache(allData);
      setWeatherData(allData);
    } catch (err) {
      console.error("Weather fetch error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllWeather();
  }, [fetchAllWeather]);

  const refetch = useCallback(() => {
    localStorage.removeItem(WEATHER_CACHE_KEY);
    fetchAllWeather();
  }, [fetchAllWeather]);

  return { weatherData, loading, error, refetch };
}
