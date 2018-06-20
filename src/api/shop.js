import {_get, _post} from './MainApiIndex'

// 查询所有店铺资料
export const queryshop = (data) => {
  let req = {
    data: data
  }
  req.url = 'api/queryshop'
  return _get(req)
}

// 新添商铺
export const addshop = (data) => {
  let req = {
    data: data
  }
  req.url = 'api/addshop'
  return _post(req)
}
