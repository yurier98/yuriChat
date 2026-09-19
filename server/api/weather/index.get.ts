import type { OpenMeteoResponse, Weather, WeatherCondition } from '~~/types'

const WMO_CONDITION_MAP: Record<number, WeatherCondition> = {
  0: 'clear',
  1: 'clear',
  2: 'partlyCloudy',
  3: 'cloudy',
  45: 'fog',
  48: 'fog',
  51: 'drizzle',
  53: 'drizzle',
  55: 'drizzle',
  56: 'drizzle',
  57: 'drizzle',
  61: 'rain',
  63: 'rain',
  65: 'rain',
  66: 'rain',
  67: 'rain',
  71: 'snow',
  73: 'snow',
  75: 'snow',
  77: 'snow',
  80: 'showers',
  81: 'showers',
  82: 'showers',
  85: 'snow',
  86: 'snow',
  95: 'thunderstorm',
  96: 'thunderstorm',
  99: 'thunderstorm',
}

// Cached on the server only. `defineCachedFunction` stores just the returned value and never
// touches response headers, unlike `defineCachedEventHandler`, which always overwrites
// `cache-control` with `max-age=<maxAge>` and therefore makes the browser cache the payload.
const getWeather = defineCachedFunction(async (): Promise<Weather> => {
  const { city, coordinates, timezone } = getLocation()
  const response = await $fetch<OpenMeteoResponse>('https://api.open-meteo.com/v1/forecast', {
    params: {
      latitude: coordinates.latitude,
      longitude: coordinates.longitude,
      current: 'temperature_2m,apparent_temperature,relative_humidity_2m,weather_code,wind_speed_10m',
      daily: 'temperature_2m_max,temperature_2m_min',
      timezone,
      forecast_days: 1,
      wind_speed_unit: 'kmh',
    },
  })
  const current = response.current

  return {
    location: city,
    temperature: Math.round(current.temperature_2m),
    temp_min: Math.round(response.daily.temperature_2m_min[0] ?? current.temperature_2m),
    temp_max: Math.round(response.daily.temperature_2m_max[0] ?? current.temperature_2m),
    feelsLike: Math.round(current.apparent_temperature),
    humidity: current.relative_humidity_2m,
    wind: Math.round(current.wind_speed_10m),
    condition: WMO_CONDITION_MAP[current.weather_code] ?? 'unknown',
  }
}, {
  maxAge: 30 * 60, // 30 minutes: weather changes hourly
  name: 'weather',
  getKey: () => 'current',
})

export default defineEventHandler(async (event) => {
  // Keep the browser out of it so payload changes show up immediately; the server still
  // serves the cached value above, so upstream is not hit on every request.
  setHeader(event, 'cache-control', 'no-store')
  return await getWeather()
})
