
// import axios from 'axios'
import { Toast } from 'vant'
// import { setLocal } from '@/common/js/utils'
// import router from '../router'

// axios.defaults.baseURL = process.env.NODE_ENV == 'development' ? 'http://localhost:5675/Clientashx/' : '//backend-api-01.newbee.ltd/api/v1'
// axios.defaults.withCredentials = true
// axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest'
// axios.defaults.headers['token'] = localStorage.getItem('token') || ''
// axios.defaults.headers.post['Content-Type'] = 'application/json'

// axios.interceptors.response.use(res => {
//   if (typeof res.data !== 'object') {
//     Toast.fail('服务端异常！')
//     return Promise.reject(res)
//   }
//   if (res.data.resultCode != 200) {
//     if (res.data.message) Toast.fail(res.data.message)
//     if (res.data.resultCode == 416) {
//       router.push({ path: '/login' })
//     }
//     if (res.data.data && window.location.hash == '#/login') {
//       setLocal('token', res.data.data)
//       axios.defaults.headers['token'] = res.data.data
//     }
//     return Promise.reject(res.data)
//   }

//   return res.data
// })

// export default axios

import axios from 'axios'
const isTest = location.host.match(/36.7|localhost|21.80/) != null
//接入服务器接口地址根目录
//http://localhost:5675/Clientashx
export const server_base_url =isTest ? 'http://47.96.90.116:12223/Clientashx/' : 'http://47.96.90.116:12223/Clientashx/';

export default function fetch(options) {
  return new Promise((resolve, reject) => {

    // https://github.com/mzabriskie/axios

    //创建一个axios实例
    const instance = axios.create({
      //设置默认根地址
      baseURL: server_base_url,
      //设置请求超时设置  
      timeout: 2000,
      //设置请求时的header
      headers: {
        
      }
    })
    //请求处理
    instance(options)
      .then(data => {
        //请求成功时,根据业务判断状态
        // if (code === port_code.success) {
        //   resolve({code, msg, data})
        //   return false
        // } else if (code === port_code.unlogin) {
        //   setUserInfo(null)
        //   router.replace({name: "login"})
        // }
        // Message.warning(msg)
        
        if(data.data.zt == 0){
          resolve(data.data)
        }  else {
          Toast.fail("接口("+options.url+")异常,请联系管理员");
        }
      })
      .catch((error) => {
        Toast.fail("接口("+options.url+")异常,请联系管理员");
        reject(error)
        // console.log(error)
        // //请求失败时,根据业务判断状态
        // if (error.response) {
        //   let resError = error.response
        //   let resCode = resError.status
        //   let resMsg = error.message
        //   console.error('操作失败！错误原因 ' + resMsg)
        //   reject({code: resCode, msg: resMsg})
        // }
      })
  })
}
