import request from '@/utils/request'

export function getElectricFence(data) {
  return request({
    url: '/func/web/getElectricFence',
    method: 'post',
    data
  })
}
