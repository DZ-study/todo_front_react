import { TResponse } from '@/types/api'
import req from './index'

interface User {
  username: string
  password: string
}
// 注册
export const register = (params: User) => {
  return req<TResponse>({
    url: '/users/register',
    method: 'post',
    data: params
  })
}

// 登录
export const login = (params: User) => {
  return req<TResponse>({
    url: '/users/login',
    method: 'post',
    data: params
  })
}
