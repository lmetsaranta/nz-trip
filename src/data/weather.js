// Weather codes from Open-Meteo WMO codes
// https://open-meteo.com/en/docs
export const WEATHER_CODES = {
  0: { condition: "sunny", label: "Clear sky", icon: "sun" },
  1: { condition: "partly_cloudy", label: "Mainly clear", icon: "cloud-sun" },
  2: { condition: "partly_cloudy", label: "Partly cloudy", icon: "cloud-sun" },
  3: { condition: "cloudy", label: "Overcast", icon: "cloud" },
  45: { condition: "fog", label: "Fog", icon: "smog" },
  48: { condition: "fog", label: "Depositing rime fog", icon: "smog" },
  51: { condition: "rain", label: "Light drizzle", icon: "cloud-rain" },
  53: { condition: "rain", label: "Moderate drizzle", icon: "cloud-rain" },
  55: { condition: "rain", label: "Dense drizzle", icon: "cloud-rain" },
  56: { condition: "rain", label: "Freezing drizzle", icon: "cloud-rain" },
  57: { condition: "rain", label: "Dense freezing drizzle", icon: "cloud-rain" },
  61: { condition: "rain", label: "Slight rain", icon: "cloud-rain" },
  63: { condition: "rain", label: "Moderate rain", icon: "cloud-rain" },
  65: { condition: "heavy_rain", label: "Heavy rain", icon: "cloud-showers" },
  66: { condition: "rain", label: "Freezing rain", icon: "cloud-rain" },
  67: { condition: "heavy_rain", label: "Heavy freezing rain", icon: "cloud-showers" },
  71: { condition: "snow", label: "Slight snow", icon: "snowflake" },
  73: { condition: "snow", label: "Moderate snow", icon: "snowflake" },
  75: { condition: "snow", label: "Heavy snow", icon: "snowflake" },
  77: { condition: "snow", label: "Snow grains", icon: "snowflake" },
  80: { condition: "rain", label: "Slight rain showers", icon: "cloud-rain" },
  81: { condition: "rain", label: "Moderate rain showers", icon: "cloud-rain" },
  82: { condition: "heavy_rain", label: "Violent rain showers", icon: "cloud-showers" },
  85: { condition: "snow", label: "Slight snow showers", icon: "snowflake" },
  86: { condition: "snow", label: "Heavy snow showers", icon: "snowflake" },
  95: { condition: "thunderstorm", label: "Thunderstorm", icon: "bolt" },
  96: { condition: "thunderstorm", label: "Thunderstorm with hail", icon: "bolt" },
  99: { condition: "thunderstorm", label: "Thunderstorm with heavy hail", icon: "bolt" },
};

// Trip date range
export const TRIP_START_DATE = "2025-12-16";
export const TRIP_END_DATE = "2026-01-11";

// Helper to get date string for a given day number
export function getDayDate(dayNumber) {
  const start = new Date(TRIP_START_DATE);
  start.setDate(start.getDate() + dayNumber - 1);
  return start.toISOString().split("T")[0];
}

// Helper to format time from ISO string
// The API returns times in NZ local time (e.g., "2025-12-16T05:46")
// so we just extract the HH:MM portion directly
export function formatTime(isoString) {
  if (!isoString) return "";
  // Extract HH:MM from "YYYY-MM-DDTHH:MM" format
  const timePart = isoString.split("T")[1];
  return timePart ? timePart.slice(0, 5) : "";
}

// Get weather info from code
export function getWeatherInfo(code) {
  return WEATHER_CODES[code] || { condition: "unknown", label: "Unknown", icon: "cloud" };
}

// localStorage key for caching
export const WEATHER_CACHE_KEY = "nz-trip-weather-data";
export const WEATHER_CACHE_VERSION = 2; // Bumped for per-location weather
