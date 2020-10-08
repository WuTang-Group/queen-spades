import axios from "~/plugins/axios";

export function getShoppingCartData() {
  return axios({
    url: '/api/shop_carts',
    method: 'get',
    params: {}
  })
}

export function addShoppingCart(data) {
  return axios({
    url: '/api/shop_carts',
    method: 'post',
    data
  })
}

export function delShoppingCart(data) {
  return axios({
    url: `/api/shop_carts/${data.product_id}`,
    method: 'delete',
  })
}

export function saveWishToCart(data) {
  return axios({
    url: '/api/shop_carts',
    method: 'post',
    data
  })
}