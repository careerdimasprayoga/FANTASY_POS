import axios from 'axios'

export default {
  state: {
    page: 3,
    limit: 3,
    totalRows: null,
    products: []
  },
  mutations: {
    data_product(state, payload) {
      console.log(payload)
      state.products = payload.msg
      state.products = payload.data
      state.totalRows = payload.data.totalData
    }
  },
  actions: {
    get_products(context, payload) {
      axios
        .get(
          `http://127.0.0.1:3009/product?page=${context.state.page}&limit=${context.state.limit}`
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
