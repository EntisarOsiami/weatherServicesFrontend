import { apiClient } from './apiClient'

export interface WeatherHistoryItem {
  lat: number
  lon: number
  requestedAt: string
  weather: {
    source: string
    tempC: number
    description: string
    location: string
    humidity: number
    windSpeed: number
  }
}

export const getWeatherHistoryCount = async (): Promise<{ total: number }> => {
  const { data } = await apiClient.get<{ total: number }>('/history', { params: { count: 'true' } })
  return data
}

export const getWeatherHistory = async (params?: {
  limit?: number
  skip?: number
  sort?: string
}): Promise<WeatherHistoryItem[]> => {
  const { data } = await apiClient.get<WeatherHistoryItem[]>('/history', { params })
  return data
}
