// 后端地址
let devBaseUrl = 'http://127.0.0.1:3000'
let productBaseUrl = ''
/// 文件
export const imgDomain = 'http://p3d0ne50u.bkt.clouddn.com/'

export const toBaseUrl = () => {
  if (process.env.NODE_ENV === 'production') {
    return productBaseUrl
  } else {
    return devBaseUrl
  }
}
