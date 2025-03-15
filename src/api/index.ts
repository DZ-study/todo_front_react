import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { message } from 'antd'

// ✅ 定义接口，约束 API 响应数据的格式
interface ApiResponse<T = any> {
  code: number
  message: string
  data: T
}

// ✅ 创建 axios 实例
const service: AxiosInstance = axios.create({
  baseURL: '/api', // 统一前缀（在 vite.config.ts 里配置代理）
  timeout: 5000, // 请求超时时间
  headers: { 'Content-Type': 'application/json' }
})

// ✅ 请求拦截器（在请求发送前做处理）
service.interceptors.request.use(
  config => {
    // 这里可以添加 Token
    const token = localStorage.getItem('token')
    console.log(token)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    config.headers['Accept-Language'] = 'zh'
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// ✅ 响应拦截器（统一处理返回的数据 & 错误）
service.interceptors.response.use(
  (response: AxiosResponse<ApiResponse<any>>) => {
    console.log(222, response)

    if (response.data.code !== 200) {
      message.error(response.data.message || '请求错误')
      return Promise.reject(response.data)
    }
    // TODO: 这里可以根据实际情况做一些处理
    return response.data as any
  },
  error => {
    console.log(333, error)
    const { code, message: msg } = error.response?.data || {}
    message.error(msg || '服务器错误')
    if (code === 403) {
      // Token无效，跳转到登录页
      // navigate('/login')
    } else {
      return Promise.reject(error.response?.data)
    }
  }
)

// ✅ 封装请求方法（支持泛型）
const request = <T = any>(config: AxiosRequestConfig): Promise<T> => {
  return service.request<ApiResponse<T>>(config).then(res => res as T)
}

export default request
