import axios from "axios"
class Request {
  constructor() {
    this.timeout = 5000
    this.baseUrl = ``
  }
  merge(option) {
    return {
      ...option,
      timeout: this.timeout,
      baseUrl: this.baseUrl
    }
  }
  middleRequest(instance) {
    // 添加请求拦截器
    instance.interceptors.request.use(function (config) {
      // 在发送请求之前做些什么
      config.headers.Authorization = "Bearer eyJhbGciOiJIUzUxMiJ9.eyJsb2dpbl91c2VyX2tleSI6ImZmMGQ4YzZiLWYwYTEtNDRkNS04NDAyLTVlZWQ0MTYxYjdiNSJ9.pDDoN1qOOxH1Wry8YT7Kxne1mj5bYA8Cjvd5Y9Z_h5tZcC9UKqJHo8l4q47RP6hgXAGIYnL24idULvKjRMSTNQ"

      return config;
    }, function (error) {
      // 对请求错误做些什么
      return Promise.reject(error);
    });

    // 添加响应拦截器
    instance.interceptors.response.use(function (response) {
      // 对响应数据做点什么
      console.log(response)
      return response.data;
    }, function (error) {
      // 对响应错误做点什么
      return Promise.reject(error);
    });
  }
  request(option) {
    let config = this.merge(option)
    let instance = axios.create()
    this.middleRequest(instance)
    return instance(config)
  }
}
export const request = new Request()