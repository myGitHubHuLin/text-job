import axios from 'axios'
import request from '@/axios'
const url = 'localhost:8080'
console.log(request);
const service = axios.create({
  baseURL:url , // url = base url + request url
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    // if (store.getters.token) {
    //   config.headers['X-Access-Token'] = getToken()
    // }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data
    console.log(res, '??')
    // if the custom code is not 20000, it is judged as an error.
    if (res.code !== 200) {
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    return Promise.reject(error)
  }
)

export default service
