import axios from 'axios'
const baseURL = 'https://twitter202109.herokuapp.com/api'

export const apiHelper = axios.create({
  baseURL
})

apiHelper.interceptors.request.use(
  config => {
    const token = window.localStorage.getItem('simpleTweeterToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  err => Promise.reject(err)
)
