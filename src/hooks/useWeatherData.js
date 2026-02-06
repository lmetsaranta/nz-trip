import { useState, useEffect, useCallback } from "react";
import { stops } from "../data/trip";
import {
  TRIP_START_DATE,
  TRIP_END_DATE,
  getDayDate,
  WEATHER_CACHE_KEY,
  WEATHER_CACHE_VERSION,
} from "../data/weather";

// Get primary stop for each day (first stop of the day)
function getPrimaryStopForDay(day) {
  const dayStops = stops.filter((s) => s.day === day);
  return dayStops[0] || null;
}

// Build location groups for batch fetching
// Group consecutive days that are in similar regions
function buildLocationGroups() {
  const groups = [];
  let currentGroup = null;

  for (let day = 1; day <= 27; day++) {
    const stop = getPrimaryStopForDay(day);
    if (!stop) continue;

    const [lat, lng] = stop.coords;

    // Check if this location is close enough to current group (within 2 degrees)
    if (currentGroup) {
      const [groupLat, groupLng] = currentGroup.coords;
      const distance = Math.sqrt(
        Math.pow(lat - groupLat, 2) + Math.pow(lng - groupLng, 2)
      );

      if (distance < 2) {
        currentGroup.days.push(day);
        continue;
      }
    }

    // Start new group
    currentGroup = {
      coords: [lat, lng],
      days: [day],
    };
    groups.push(currentGroup);
  }

  return groups;
}

// Fetch weather for a location group
async function fetchWeatherForGroup(group) {
  const [lat, lng] = group.coords;
  const startDay = Math.min(...group.days);
  const endDay = Math.max(...group.days);
  const startDate = getDayDate(startDay);
  const endDate = getDayDate(endDay);

  const params = new URLSearchParams({
    latitude: lat.toString(),
    longitude: lng.toString(),
    start_date: startDate,
    end_date: endDate,
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

// Parse API response into day-indexed data
function parseWeatherResponse(data, group) {
  const result = {};
  const daily = data.daily;

  if (!daily || !daily.time) return result;

  daily.time.forEach((date, index) => {
    // Find which day this date corresponds to
    const dayNumber = group.days.find((d) => getDayDate(d) === date);
    if (!dayNumber) return;

    result[dayNumber] = {
      date,
      tempMax: daily.temperature_2m_max?.[index],
      tempMin: daily.temperature_2m_min?.[index],
      precipitation: daily.precipitation_sum?.[index],
      precipitationProbability: daily.precipitation_probability_max?.[index],
      weatherCode: daily.weathercode?.[index],
      windSpeed: daily.windspeed_10m_max?.[index],
      uvIndex: daily.uv_index_max?.[index],
      sunrise: daily.sunrise?.[index],
      sunset: daily.sunset?.[index],
    };
  });

  return result;
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
      const groups = buildLocationGroups();
      const allData = {};

      // Fetch each group sequentially to avoid rate limiting
      for (const group of groups) {
        const response = await fetchWeatherForGroup(group);
        const parsed = parseWeatherResponse(response, group);
        Object.assign(allData, parsed);

        // Small delay between requests
        await new Promise((resolve) => setTimeout(resolve, 100));
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
