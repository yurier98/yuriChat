export interface OpenWeatherResponse {
  name: string
  main: {
    temp: number
    temp_min: number
    temp_max: number
    humidity: number
  }
  wind: {
    speed: number
  }
  weather: {
    description: string
  }[]
};

export interface Weather {
  location: string
  temperature: number
  temp_min: number
  temp_max: number
  humidity: number
  wind: number
  description: string
};
