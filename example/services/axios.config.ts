import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
import { UserStorage } from '@example/util/user-storage';

export const axiosInstance = axios.create({
  baseURL: '/email'
});

axiosInstance.interceptors.request.use(async function (config) {
  try {
    const token = await UserStorage.getToken();
    config.headers['quick-token'] = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNDc1NDAzMDUwMjE4OTA5Njk4IiwiZXhwIjoxNjQ2OTIzMjM2LCJzdG9yZUlkIjo0OTEsImlhdCI6MTY0Njg4MDAzNiwidXNlcklkIjoxNDc1NDAzMDUwMjE4OTA5Njk4LCJzdGFmZklkIjoxNDk5NjcxMTA3ODAyNDI3MzkzfQ.mpq8lbR1KiawBA39KRg4wgayykL3kEkv8UjTJV6bsf0';
  } catch (error) {
    // window.location.assign(LOGIN_ADDRESS);
  } finally {
    return config;
  }
});

axiosInstance.interceptors.response.use(
  function <T>(res: AxiosResponse<T>) {
    return new Promise((resolve, reject) => {
      return resolve(res);
    });
  },
  (error) => {
    throw {
      ...error,
      message: error?.response?.data?.message || error?.message || error
    };
  }
);

export const request = {
  async get<T>(url: string, config?: AxiosRequestConfig | undefined) {
    return axiosInstance.get<T>(url, config).then(data => data.data);
  },
  async post<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig | undefined
  ) {
    return axiosInstance.post<T>(url, data, config).then(data => data.data);
  }
};
