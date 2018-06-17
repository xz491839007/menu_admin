import {_get, _post, _urlGet} from './MainApiIndex'

// 添加一个账户
export const addadmin = (data) => {
  let req = {
    data: data
  }
  req.url = 'api/addadmin'
  return _get(req)
}

// test
export const queryjson = (data) => {
  let req = {
    data: data
  }
  req.url = 'getjson'
  return _get(req)
}

/// 登录接口
export const loginAction = (account, password, ip) => {
  let req = {
    data: {
      account: account,
      password: password,
      ip: ip
    }
  }
  req.url = 'api/login'
  return _post(req)
}

/// 直接
export const IpAction = () => {
  let req = {
    data: {}
  }
  req.url = 'http://httpbin.org/ip'
  return _urlGet(req)
}
