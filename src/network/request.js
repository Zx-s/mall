import axios from 'axios'


export function request(config) {
  //1.创建一个axios 实例
  const instance = axios.create({
    baseURL: 'http://123.207.32.32:8000/api/m3',
    timeout: 5000  //设置网络请求超时时间
  })
  //2.拦截器的使用
  //①.请求的拦截
  axios.interceptors.request.use(config => {
    return config
  }, err => {
    console.log(err);
  })

  //②.响应的拦截
  axios.interceptors.response.use(res => {
    return res.data  //这里不需要返回整个res  因为res里面有很多axios 添加的一些属性，我们需要用到的就只是服务器请求过来的数据 就是这个res里面的data
  }, err => {
    console.log(err);
  })

  //3.直接返回 因为axios 这个实例返回的就是一个Promise
  return instance(config)//真正的网络请求
}


