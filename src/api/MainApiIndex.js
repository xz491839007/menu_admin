import {toBaseUrl} from '@/config'
// import router from '@/router'
const axios = require('axios')
// axios.default.withCredentials = true

function toServer (method, url, data) {
  url = toBaseUrl() + url
  if (method === 'post') {
    // let params = new URLSearchParams()
    // params.append(data)
    return axios.post(url, data)
  } else if (method === 'get') {
    return axios.get(url, data)
  } else if (method === 'put') {
    return axios({method: 'put', url: url, data: data})
  } else {
    return axios({method: 'delete', url: url, data: data})
  }
}

// .create({
//   // baseURL: baseURL, // api请求的baseURL
//   timeout: 1000,
//   withCredentials: true, // 允许跨域 cookie
//   headers: {'X-Requested-With': 'XMLHttpRequest'},
//   maxContentLength: 2000,
//   transformResponse: [function (data) {
//     try {
//       data = JSON.parse(data)
//     } catch (e) {
//       data = {}
//     }
//     if (data.status === 403) {
//       // removeInfo()
//       // router.push('/login')
//     }
//     return data
//   }]
// })
// 重新封装了调用借口，分为了两种方式，第一种方式通过本地

// get
export const _get = (req) => {
  console.log('-------', +req.url)
  return toServer('get', `/${req.url}`, {params: req.data})
}

// post
export const _post = (req) => {
  return toServer('post', `/${req.url}`, req.data)
}

// patch
export const _put = (req) => {
  return toServer('put', `/${req.url}`, req.data)
}

// delete
export const _delete = (req) => {
  return toServer('delete', `/${req.url}`, req.data)
}

// post and no withCredentials
export const _postNoWithCredentials = (req) => {
  return axios('post', `/${req.url}`, req.data, false)
}

export const _urlGet = (req) => {
  return axios.get(req.url, req.data)
}
