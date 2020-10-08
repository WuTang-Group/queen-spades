import axios from "~/plugins/axios";

export function saveContactInfo(data) {
  return axios({
    url: '/api/contact_us',
    method: 'post',
    data
  })
}