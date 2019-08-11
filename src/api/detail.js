import request from '@/utils/request'

// 订单列表
export function orderList(params) {
  return request({
    url: 'ly/listorder',
    method: 'get',
    params: params,
  })
}
