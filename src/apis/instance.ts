import axios, { type AxiosRequestConfig, type AxiosResponse } from 'axios'

import { clearAuth } from '@/utils/auth'

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'https://api-dev.pliview.kr'

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
})

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      clearAuth()
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export const api = <T>(
  config: AxiosRequestConfig
): Promise<AxiosResponse<T>> => {
  return axiosInstance(config)
}

export default api
