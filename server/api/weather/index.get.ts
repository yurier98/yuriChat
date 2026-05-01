import type { OpenWeatherResponse } from '~~/types'

export default defineCachedEventHandler(async (event) => {
  const { openWeather } = useRuntimeConfig(event)
  const response = await $fetch<OpenWeatherResponse>(`https://api.openweathermap.org/data/2.5/weather`, {
    params: {
      q: 'La Habana,CU',
      units: 'metric',
      lang: 'es',
      appid: openWeather.apiKey,
    },
  })
  const weather = {
    location: response.name,
    temperature: Math.round(response.main.temp),
    temp_min: Math.round(response.main.temp_min),
    temp_max: Math.round(response.main.temp_max),
    humidity: response.main.humidity,
    wind: response.wind.speed,
    description: response.weather?.[0]?.description ?? '',
  }

  return weather
}, {
  maxAge: 12 * 60 * 60, // 12 hours
})
