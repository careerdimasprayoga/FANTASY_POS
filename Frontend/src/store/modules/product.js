import axios from 'axios'

export default {
  state: {
    page: 1,
    limit: 6,
    totalRows: null,
    products: []
  },
  mutations: {
    data_product(state, payload) {
      state.products = payload.msg
      state.products = payload.data
      // state.totalRows = payload.pagination.totalData
    },
    s_change_page(state, payload) {
      state.page = payload
    }
  },
  actions: {
    get_products(context, payload) {
      axios
        .get(
          `${process.env.VUE_APP_BASE_URL}/product?page=${context.state.page}&limit=${context.state.limit}`
        )
        .then((response) => {
          context.commit('data_product', response.data)
        //   console.log(response)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  },
  getters: {
    getLimit(state) {
      return state.limit
    },
    get_product(state) {
      return state.products
    },
    getTotalRows(state) {
      return state.totalRows
    },
    getCart(state) {
      return state.cart
    }
  }
}
