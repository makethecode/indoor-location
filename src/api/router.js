import request from '@/utils/request'

export function getRouterInfo(data) {
  return request({
    url: '/func/web/getRouterInfo',
    method: 'post'
  })
}
