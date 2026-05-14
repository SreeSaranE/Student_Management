import axios from 'axios'

const API = axios.create({
  baseURL: 'http://localhost:5287/api'
})

export default API