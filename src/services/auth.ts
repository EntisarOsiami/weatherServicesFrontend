import { apiClient } from './apiClient'

export interface SignUpRequest {
  email: string
  password: string
}

export interface SignInRequest {
  email: string
  password: string
}

export interface AuthResponse {
  success: boolean
  token: string
  user?: {
    id: string
    email: string
  }
}

export const signUp = async (userData: SignUpRequest): Promise<AuthResponse> => {
  const { data } = await apiClient.post<AuthResponse>('/auth/signup', userData)
  return data
}

export const signIn = async (credentials: SignInRequest): Promise<AuthResponse> => {
  const { data } = await apiClient.post<AuthResponse>('/auth/signin', credentials)
  return data
}

export const signOut = async (): Promise<void> => {
  await apiClient.post('/auth/signout')
  localStorage.removeItem('token')
}

export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem('token')
}

export const getToken = (): string | null => {
  return localStorage.getItem('token')
}

export const setToken = (token: string): void => {
  localStorage.setItem('token', token)
}