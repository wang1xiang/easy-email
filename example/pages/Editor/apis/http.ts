import Axios, { AxiosResponse, AxiosRequestConfig } from 'axios'
import { message } from 'antd'
// 统一配置
let baseURL = ''
const service = Axios.create({
  baseURL,
  responseType: 'json',
  timeout: 300000
})
export const serviceStream = Axios.create({
  baseURL,
  responseType: 'blob',
  timeout: 300000
})
serviceStream.interceptors.request.use((res: any) => {
  res.headers.loginUserId = ''
  res.headers.loginCompanyId = ''

  return res
})

service.interceptors.request.use((res: any) => {
  res.headers['quick-token'] = sessionStorage.getItem('quick-token') || ''
  res.headers['Accept-Language'] = 'zh'
  res.headers['Access-Control-Allow-Origin'] = '*'
  return res
})

// 拦截响应
service.interceptors.response.use(
  (response: any) => {
    const res = response.data
    if (res.success) {
      if (res.message) {
        message.success(res.message, 5)
      }
      return response
    } else {
      if (res.message) {
        message.error(res.message, 5)
      }
      return Promise.reject(res)
    }
  },
)

// 异常token过期 重定向到 login
export default function request<Q = any, Res = any>(req: AxiosRequestConfig & {data?: Q}) {
  return service(req).then((res) => {
    return res.data as {success?: boolean, data: Res, code: number, message: string}
  })
}