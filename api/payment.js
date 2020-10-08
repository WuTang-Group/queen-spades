import axios from "~/plugins/axios";

export function initPayment(url, params) {
  return axios({
    url: url,
    method: 'get',
    params
  })
}