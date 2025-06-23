import axios, { type AxiosResponse } from 'axios'

export const apiClient = axios.create({
  baseURL: 'https://weatherservices.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  },
})

apiClient.interceptors.request.use(
  (config) => {
    const publicEndpoints = ['/auth/signup', '/auth/signin']
    const isPublicEndpoint = publicEndpoints.some(endpoint => config.url?.includes(endpoint))
    
    if (!isPublicEndpoint) {
      const token = localStorage.getItem('token')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
    }
    return config
  },
  (error) => Promise.reject(error)
)

apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    const message = error.response?.data?.error?.message || 
                   error.response?.data?.message || 
                   error.message || 
                   'network error'
    return Promise.reject(new Error(message))
  }
)
