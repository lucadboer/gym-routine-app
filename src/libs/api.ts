import axios from 'axios'

export const api = axios.create({
  baseURL: '192.168.0.13:3333',
})
