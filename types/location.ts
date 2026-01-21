export interface LocationResponse {
  name: string
  shortName: string
  address: string
  coordinates: {
    latitude: number
    longitude: number
  }
  city: string
  country: string
  countryCode: string
  flag: string
  description: string
  website: string
  founded: number
  type: string
  specialties: string[]
  timezone: string
  currentTime: string
}
