import request from '@/utils/request'
import { getToken } from '@/utils/auth'

// 游戏列表
export function listgoods(params) {
  return request({
    url: 'ly/listgoods',
    method: 'get',
    params: params,
  })
}

// 添加游戏
export function addGoods(params) {
  return request({
    url: 'ly/addgoods',
    method: 'post',
    data: {
      name: params.name,
      token: getToken(),
      amount: params.amount,
      is_active: params.is_active,
      game_id: params.game_id,
    }
  })
}

// 编辑游戏
export function editGoods(params) {
  return request({
    url: 'ly/updategoods',
    method: 'post',
    data: {
      name: params.name,
      token: getToken(),
      amount: params.amount,
      is_active: params.is_active,
      game_id: params.game_id,
      id: params.id,
    }
  })
}

// 游戏详情
export function detailGoods(params) {
  return request({
    url: 'ly/disgoods',
    method: 'get',
    params: params,
  })
}


// 修改状态
export function editStatus(params) {
  return request({
    url: 'ly/updatetypegoods',
    method: 'post',
    data: {
      token: getToken(),
      id: params.id,
      is_active: params.is_active,
      game_id: params.game_id,
    }
  })
}