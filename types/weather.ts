export interface OpenMeteoResponse {
  current: {
    temperature_2m: number
    apparent_temperature: number
    relative_humidity_2m: number
    weather_code: number
    wind_speed_10m: number
  }
  daily: {
    temperature_2m_max: number[]
    temperature_2m_min: number[]
  }
}

export type WeatherCondition
  = | 'clear'
    | 'partlyCloudy'
    | 'cloudy'
    | 'fog'
    | 'drizzle'
    | 'rain'
    | 'showers'
    | 'snow'
    | 'thunderstorm'
    | 'unknown'

export interface Weather {
  location: string
  temperature: number
  temp_min: number
  temp_max: number
  feelsLike: number
  humidity: number
  wind: number
  condition: WeatherCondition
}
