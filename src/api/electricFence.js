import request from '@/utils/request'

export function getElectricFence(data) {
  return request({
    url: '/func/web/getElectricFence',
    method: 'post',
    data
  })
}
export function saveElectricFence(mapId,capability, level) {
  return request({
    url: '/func/web/saveElectricFence',
    method: 'post',
    data: {
      mapId,
      capability,
      level
    }
  })
}
