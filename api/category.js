import axios from "~/plugins/axios";

export function getThehouseCategory() {
  return axios({
    url: '/api/the_house/category',
    method: 'get',
    params: {}
  })
}