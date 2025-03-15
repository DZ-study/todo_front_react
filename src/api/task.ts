import { TResponse } from '@/types/api'
import req from './index'

// 获取任务列表
export const getTaskList = () => {
  return req<TResponse>({
    url: '/tasks/list',
    method: 'get'
  })
}
