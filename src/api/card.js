import request from '@/utils/request'

export function getCardInfo(data) {
  return request({
    url: '/func/web/getCardInfo',
    method: 'post'
  })
}
