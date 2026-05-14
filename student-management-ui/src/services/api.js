import axios from 'axios'

const API = axios.create({
  baseURL:
    'https://student-management-q9l9.onrender.com/api'
})

export default API