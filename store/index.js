export const state = () => ({
  navigatState: false,
  overState: false,
  userInfo: {},
  wishInfo: {},
  cartInfo: []
})

export const mutations = {
  SET_NAVIGAT_STATE (state, navigatState) {
    state.navigatState = navigatState
  },
  SET_OVER_STATE (state, overState) {
    state.overState = overState
  },
  SET_USER (state, user) {
    state.userInfo = user
  },
  SET_WISH_INFO (state, wishInfo) {
    state.wishInfo = wishInfo
  },
  SET_CART_INFO (state, cartInfo) {
    state.cartInfo = cartInfo
  }
}

export const actions = {
  nuxtServerInit ({ commit }, { req }) {
    if (req.session && req.session.authUser) {
      commit('SET_USER', req.session.authUser)
    }
  }
}