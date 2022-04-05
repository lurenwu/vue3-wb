

import axios from '../utils/axios'

export function GetBranchList(params) {
  return axios({
    url: '/Auth.ashx',
    method: 'get',
    params
  })
}


