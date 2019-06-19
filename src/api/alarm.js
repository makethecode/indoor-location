import request from '@/utils/request'

export function getAlarmInfo(data) {
  return request({
    url: '/func/web/getAlarmInfo',
    method: 'post'
  })
}
