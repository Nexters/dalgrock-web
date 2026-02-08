import axios, { type AxiosRequestConfig, type AxiosResponse } from 'axios'

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'https://api.pliview.kr'

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
})

export const api = <T>(
  config: AxiosRequestConfig
): Promise<AxiosResponse<T>> => {
  return axiosInstance(config)
}

export default api
