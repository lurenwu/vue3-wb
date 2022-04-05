

import axios from '../utils/axios'

export function get(params) {
  return axios({
    url: '/Auth.ashx',
    method: 'get',
    params
  })
}

export function post(data) {
  console.log(data)
  return axios({
    url: '/Auth.ashx',
    method: 'post',
    data
  })
}

