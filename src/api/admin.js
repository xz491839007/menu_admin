import {_get, _post} from './MainApiIndex'

// 查询所有管理员账户
export const queryadmin = (data) => {
  let req = {
    data: data
  }
  req.url = 'api/queryadmin'
  return _get(req)
}

// 添加所有者管理账户
export const initAdmin = (data) => {
  let req = {
    data: data
  }
  req.url = 'api/addadmin'
  return _post(req)
}
