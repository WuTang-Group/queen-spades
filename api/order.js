import axios from "~/plugins/axios";

export function getOrderList(data) {
  return axios({
    url: '/api/orders',
    method: 'get',
    params: data
  })
}

export function cancelOrder(data) {
  return axios({
    url: '/api/orders/cancel',
    method: 'put',
    data
  })
}