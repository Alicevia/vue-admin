import axios from 'axios'

const request = axios.create({
  timeout:10000,
  // baseURL:'/dev'
})

request.interceptors.request.use((config)=>{
  return config
},e=>e)

request.interceptors.response.use(response=>{
  return response
},e=>{
  return Promise.reject(e)
})

export {request}