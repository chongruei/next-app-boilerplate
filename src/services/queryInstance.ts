import axios from 'axios'

export const queryInstance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com'
})
