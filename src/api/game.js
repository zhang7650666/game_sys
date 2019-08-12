import request from '@/utils/request'
import { getToken } from '@/utils/auth'

// 游戏列表
export function listgames(params) {
  return request({
    url: 'ly/listgames',
    method: 'get',
    params: params,
  })
}

// 添加游戏
export function addGame(params) {
  return request({
    url: 'ly/addgame',
    method: 'post',
    data: {
      name: params.name,
      token: getToken(),
      notify_url: params.notify_url,
      // is_active: params.is_active,
    }
  })
}

// 编辑游戏
export function editGame(params) {
  return request({
    url: 'ly/updategame',
    method: 'post',
    data: {
      name: params.name,
      token: getToken(),
      notify_url: params.notify_url,
      id: params.id,
      is_active: params.is_active,
    }
  })
}

// 游戏详情
export function detailGame(params) {
  return request({
    url: 'ly/disgame',
    method: 'get',
    params: params,
  })
}

// 修改状态
export function editStatus(params) {
  return request({
    url: 'ly/updatetype',
    method: 'post',
    data: {
      token: getToken(),
      id: params.id,
      is_active: params.is_active,
    }
  })
}