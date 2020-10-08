import axios from "~/plugins/axios";

export function getWishList(data) {
  return axios({
    url: '/api/wish_list',
    method: 'get',
    params: data
  })
}

export function addToWishlist(data) {
  return axios({
    url: '/api/wish_list',
    method: 'post',
    data:{
      product_id: data.product_id
    }
  })
}

export function deleteWish(data) {
  return axios({
    url: `/api/wish_list/${data.product_id}`,
    method: 'delete',
    data:{}
  })
}