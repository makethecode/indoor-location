import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/user/login',
    url: '/func/auth/webLogin',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    url: '/func/web/getUserInfo',
    method: 'post',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    url: '/func/web/logout',
    method: 'post'
  })
}
