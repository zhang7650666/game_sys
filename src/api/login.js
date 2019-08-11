import request from '@/utils/request'
import { getToken } from '@/utils/auth'

// 注册
export function adduser(params) {
  return request({
    url: 'ly/adduser',
    method: 'post',
    data: {
      business_name: params.business_name,
      phone: params.phone,
      pwd: params.pwd,
      re_pwd: params.re_pwd,
    }
  })
}

// 登录
export function login(params) {
  return request({
    url: 'ly/login' + params,
    method: 'get',
  })
}

// 获取用户信息
export function getInfo() {
  return request({
    url: '/admin/info',
    method: 'get',
  })
}

// 登出
export function logout(params) {
  return request({
    url: 'ly/outlogin',
    method: 'get',
    params: {
      token: getToken()
    }
  })
}
