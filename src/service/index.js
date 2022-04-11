

import axios from '../utils/axios'
import Qs from 'qs'
export function login(data) {
  return axios({
    url: '/Auth.ashx?t=login',
    method: 'post',
    data,
    transformRequest: [function (data) {
      data = Qs.stringify(data);
      return data;
    }],
  })
}


export function getTimeList(data) {
  return axios({
    url: '/Auth.ashx?t=getTimeList',
    method: 'get',
    data
  })
}

export function updateKehuInfoStatus(data) {
  return axios({
    url: '/Auth.ashx?t=updateKehuInfoStatus',
    method: 'post',
    data,
    transformRequest: [function (data) {
      data = Qs.stringify(data);
      return data;
    }],
  })
}


export function getInfo(params) {
  return axios({
    url: '/Auth.ashx?t=getInfo',
    method: 'get',
    params
  })
}
export function getLogInfo(params) {
  return axios({
    url: '/Auth.ashx?t=getLogList',
    method: 'get',
    params
  })
}

export function addInfo(data) {
  return axios({
    url: '/Auth.ashx?t=updateinfo',
    method: 'post',
    data,
    transformRequest: [function (data) {
      data = Qs.stringify(data);
      return data;
    }],
  })
}
export function updateKehuInfoRead(data) {
  return axios({
    url: '/Auth.ashx?t=updateKehuInfoRead',
    method: 'post',
    data,
    transformRequest: [function (data) {
      data = Qs.stringify(data);
      return data;
    }],
  })
}
export function editInfo(data) {
  return axios({
    url: '/Auth.ashx?t=updateinfo',
    method: 'post',
    data,
    transformRequest: [function (data) {
      data = Qs.stringify(data);
      return data;
    }],
  })
}


export function getInfoList(params) {
  return axios({
    url: '/Auth.ashx?t=getInfoList',
    method: 'get',
    params

  })
}


export function getSelfInfoList(params) {
  return axios({
    url: '/Auth.ashx?t=getSelfInfoList',
    method: 'get',
    params

  })
}




export function getBrandList(params) {
  return axios({
    url: '/Auth.ashx?t=getBrandList',
    method: 'get',
    params
  })
}

export function get(data) {
  return axios({
    url: '/Auth.ashx',
    method: 'get',
    data
  })
}

export function post(params) {
  console.log(params)
  return axios({
    url: '/Auth.ashx',
    method: 'post',
    params
  })
}

