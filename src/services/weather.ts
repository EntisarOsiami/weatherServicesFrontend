import { apiClient } from './apiClient'

export interface WeatherData {
  success: boolean
  data: {
    location: string
    temperature: number
    description: string
    humidity: number
    windSpeed: number
  }
  source: 'cache' | 'openweather'
}

export const getCurrentWeather = async (lat: number, lon: number): Promise<WeatherData> => {
  const { data } = await apiClient.get<WeatherData>('/weather', { params: { lat, lon } })
  return data
}
