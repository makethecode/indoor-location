import request from '@/utils/request'

export function getLocation(card) {
  return request({
    url: '/func/allow/getGoodsList',
    method: 'post',
    card
  })
}
